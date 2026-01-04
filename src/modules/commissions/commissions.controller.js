import commissionsService from './commissions.service.js';
import { success, error } from '../../utils/response/response.js';

const commissionsController = {
    createCommission: async (req, res) => {
        try {
            const { userId } = req.user;
            const commission = await commissionsService.createCommission(userId, req.body);
            success(req, res, commission, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getCommissions: async (req, res) => {
        try {
            const { id } = req.params;
            const commissions = await commissionsService.getCommissions(id);
            success(req, res, commissions, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getCommissionsById: async (req, res) => {
        try {
            const { id } = req.params;
            const commission = await commissionsService.getCommissionsById(id);
            success(req, res, commission, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getCommissionsByLabel: async (req, res) => {
        try {
            const { labelId } = req.params;
            const commissions = await commissionsService.getCommissionsByLabel(labelId);
            success(req, res, commissions, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getCommissionsByTitle: async (req, res) => {
        try {
            const { title } = req.params;
            const commissions = await commissionsService.getCommissionsByTitle(title);
            success(req, res, commissions, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getCommissionsByPrice: async (req, res) => {
        try {
            const { price } = req.params;
            const commissions = await commissionsService.getCommissionsByPrice(price);
            success(req, res, commissions, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updateCommission: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.user;
            const result = await commissionsService.updateCommission(userId, id, req.body);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updateCommissionLabels: async (req, res) => {
        try {
            const { id } = req.params;
            const { labels } = req.body;
            const { userId } = req.user;
            const result = await commissionsService.updateCommissionLabels(userId, id, labels);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    }
}

export default commissionsController