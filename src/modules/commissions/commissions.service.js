import commissionsRepository from './commissions.repository.js';
import postsRepository from '../posts/posts.repository.js';
import validators from '../../utils/validators/index.js';

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
            throw ({message: 'All fields are required', statusCode: 400});
        }

        const existsExample = await postsRepository.getPostById(commission.exampleId);
        if (!existsExample) {
            throw ({message: 'Example not found', statusCode: 404});
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
            throw ({message: 'Commission creation failed', statusCode: 500});
        }

        if (labels && labels.length > 0) {
            await commissionsRepository.addLabels(newCommission.commissionId, labels);
        }

        return { ...newCommission, labels };
    },

    getCommissions: async (id) => {
        const commissions = await commissionsRepository.getCommissions(id);

        if (!commissions) {
            throw ({ message: "Commissions not found", statusCode: 404 });
        }

        return commissions;
    },

    getCommissionsById: async (id) => {
        const commission = await commissionsRepository.getCommissionsById(id);

        if (!commission) {
            throw ({ message: "Commission not found", statusCode: 404 });
        }

        const labels = await commissionsRepository.getLabelsByCommissionId(id);
        return { ...commission, labels };
    },

    getCommissionsByLabel: async (labelId) => {
        if (!labelId) {
            throw ({ message: "Invalid label", statusCode: 400 });
        }
        const commissions = await commissionsRepository.getCommissionsByLabel(labelId);

        if (!commissions) {
            throw ({ message: "Commissions not found", statusCode: 404 });
        }

        return commissions;
    },

    getCommissionsByTitle: async (title) => {
        if (!title) {
            throw ({ message: "No title provided", statusCode: 400 });
        }

        const commissions = await commissionsRepository.getCommissionsByTitle(title);

        if (!commissions) {
            throw ({ message: "Commissions not found", statusCode: 404 });
        }

        return commissions;
    },

    getCommissionsByPrice: async (price) => {
        if (!price && validators.isPrice(price)) {
            throw ({ message: "Invalid price", statusCode: 400 });
        }

        const commissions = await commissionsRepository.getCommissionsByPrice(price);

        if (!commissions) {
            throw ({ message: "Commissions not found", statusCode: 404 });
        }

        return commissions;
    },

    updateCommission: async (id, commissionData) => {
        const commission = await commissionsRepository.getCommissionsById(id);
        if (!commission) {
            throw ({ message: "Commission not found", statusCode: 404 });
        }

        const errors = validators.validateUpdate(commissionData);
        if (errors.length > 0) {
            throw ({ message: errors, statusCode: 400 });
        }

        const updated = await commissionsRepository.updateCommission(id, commissionData);
        if (!updated) {
            throw ({ message: "Commission update failed", statusCode: 500 });
        }

        return commissionsService.getCommission(id);
    },

    updateCommissionLabels: async (id, labels) => {
        const commission = await commissionsRepository.getCommissionsById(id);
        if (!commission) {
            throw ({ message: "Commission not found", statusCode: 404 });
        }

        if (!labels || !labels.length > 0) {
            throw ({ message: "Invalid labels", statusCode: 400 });
        }

        const removed = await commissionsRepository.removeLabels(id);

        if (!removed) {
            throw ({ message: "Labels not removed", statusCode: 500 });
        }

        const added = await commissionsRepository.addLabels(id, labels);

        if (!added) {
            throw ({ message: "Labels not added", statusCode: 500 });
        }

        const newLabels = await commissionsRepository.getLabelsByCommissionId(id);

        return { message: "Labels updated successfully", labels: newLabels };
    },

    deleteCommission: async (id) => {
        const commission = await commissionsRepository.getCommissionsById(id);
        if (!commission) {
            throw ({ message: "Commission not found", statusCode: 404 });
        }

        await commissionsRepository.removeLabels(id);

        const deleted = await commissionsRepository.deleteCommission(id);
        if (!deleted) {
            throw ({ message: "Commission deletion failed", statusCode: 500 });
        }

        return { message: "Commission deleted successfully", commission: deleted };
    }
}

export default commissionsService;