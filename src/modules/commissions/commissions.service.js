import commissionsRepository from "./commissions.repository.js";
import postsRepository from "../posts/posts.repository.js";
import validators from "../../utils/validators/index.js";
import notificationsService from "../notifications/notifications.service.js";
import userRepository from "../../modules/users/user.repository.js";
import AppError from "../../utils/errors/AppError.js";

const commissionsService = {
    createCommission: async (userId, commissionData) => {

        const { commission, labels } = commissionData;

        if (
            (!commission.title && validators.isString(commission.title)) ||
            (!commission.content && validators.isLink(commission.content)) ||
            (!commission.exampleId) ||
            (!commission.description && validators.isString(commission.description)) ||
            (!commission.price && validators.isPrice(commission.price)) ||
            (!commission.terms && validators.isString(commission.terms))
        ) {
            throw new AppError('Input data invalid', 400);
        }

        const existsExample = await postsRepository.getPostById(commission.exampleId);
        if (!existsExample) {
            throw new AppError('Example not found', 404);
        }

        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        const newCommission = await commissionsRepository.createCommission({
            userId,
            title: commission.title,
            content: commission.content,
            exampleId: commission.exampleId,
            description: commission.description,
            price: commission.price,
            terms: commission.terms
        });


        if (!newCommission) {
            throw new AppError('Commission creation failed', 500);
        }

        if (labels && labels.length > 0) {
            await commissionsRepository.addLabels(newCommission.commissionId, labels);
        }

        await notificationsService.createNotificationGlobal({
            userId,
            type: 'commission',
            message: `${user.name} ha creado una nueva comisión`
        });

        return { ...newCommission, labels };
    },

    getCommissions: async (id) => {
        const commissions = await commissionsRepository.getCommissions(id);

        if (!commissions) {
            throw new AppError("Commissions not found", 404);
        }

        return commissions;
    },

    getCommissionsById: async (id) => {
        const commission = await commissionsRepository.getCommissionsById(id);

        if (!commission) {
            throw new AppError("Commission not found", 404);
        }

        const labels = await commissionsRepository.getLabelsByCommissionId(id);
        return { ...commission, labels };
    },

    getCommissionsByLabel: async (labelId) => {
        if (!labelId) {
            throw new AppError("Invalid label", 400);
        }
        const commissions = await commissionsRepository.getCommissionsByLabel(labelId);

        if (!commissions) {
            throw new AppError("Commissions not found", 404);
        }

        return commissions;
    },

    getCommissionsByTitle: async (title) => {
        if (!title) {
            throw new AppError("No title provided", 400);
        }

        const commissions = await commissionsRepository.getCommissionsByTitle(title);

        if (!commissions) {
            throw new AppError("Commissions not found", 404);
        }

        return commissions;
    },

    getCommissionsByPrice: async (price) => {
        if (!price && validators.isPrice(price)) {
            throw new AppError("Invalid price", 400);
        }

        const commissions = await commissionsRepository.getCommissionsByPrice(price);

        if (!commissions) {
            throw new AppError("Commissions not found", 404);
        }

        return commissions;
    },

    updateCommission: async (userId, id, commissionData) => {
        const commission = await commissionsRepository.getCommissionsById(id);
        if (!commission) {
            throw new AppError("Commission not found", 404);
        }

        const errors = validators.validateUpdate(commissionData);
        if (errors.length > 0) {
            throw new AppError(errors, 400);
        }

        let labels = [];
        if (commissionData.labels) {
            labels = commissionData.labels;
            delete commissionData.labels;
        }

        const updated = await commissionsRepository.updateCommission(id, commissionData);
        if (!updated) {
            throw new AppError("Commission update failed", 500);
        }

        if (labels.length > 0) {
            await commissionsRepository.removeLabels(id);
            await commissionsRepository.addLabels(id, labels);
        }

        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        await notificationsService.createNotificationGlobal({
            userId,
            type: 'commission',
            message: `${user.name} ha actualizado la comisión ${commission.title}`
        });

        return commissionsService.getCommissionsById(id);
    },

    updateCommissionLabels: async (userId, id, labels) => {
        const commission = await commissionsRepository.getCommissionsById(id);
        if (!commission) {
            throw new AppError("Commission not found", 404);
        }

        if (!labels || !labels.length > 0) {
            throw new AppError("Invalid labels", 400);
        }

        await commissionsRepository.removeLabels(id);

        const added = await commissionsRepository.addLabels(id, labels);

        if (!added) {
            throw new AppError("Labels not added", 500);
        }

        const newLabels = await commissionsRepository.getLabelsByCommissionId(id);

        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        await notificationsService.createNotificationGlobal({
            userId,
            type: 'commission',
            message: `${user.name} ha actualizado la comisión ${commission.title}`
        });

        return { message: "Labels updated successfully", labels: newLabels };
    }
}

export default commissionsService;