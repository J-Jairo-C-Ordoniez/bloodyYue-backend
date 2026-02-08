import commissionsService from './commissions.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';

const commissionsController = {
    createCommission: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const commission = await commissionsService.createCommission(userId, req.body);
        success(req, res, commission, 201);
    }),

    getCommissions: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const commissions = await commissionsService.getCommissions(id);
        success(req, res, commissions, 200);
    }),

    getCommissionsById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const commission = await commissionsService.getCommissionsById(id);
        success(req, res, commission, 200);
    }),

    getCommissionsByLabel: asyncHandler(async (req, res) => {
        const { labelId } = req.params;
        const commissions = await commissionsService.getCommissionsByLabel(labelId);
        success(req, res, commissions, 200);
    }),

    getCommissionsByTitle: asyncHandler(async (req, res) => {
        const { title } = req.params;
        const commissions = await commissionsService.getCommissionsByTitle(title);
        success(req, res, commissions, 200);
    }),

    getCommissionsByPrice: asyncHandler(async (req, res) => {
        const { price } = req.params;
        const commissions = await commissionsService.getCommissionsByPrice(price);
        success(req, res, commissions, 200);
    }),

    updateCommission: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { userId } = req.user;
        const result = await commissionsService.updateCommission(userId, id, req.body);
        success(req, res, result, 200);
    }),

    updateCommissionLabels: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { labels } = req.body;
        const { userId } = req.user;
        const result = await commissionsService.updateCommissionLabels(userId, id, labels);
        success(req, res, result, 200);
    })
}

export default commissionsController
