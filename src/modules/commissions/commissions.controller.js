import * as commissionsService from './commissions.service.js';
import { success, error } from '../../utils/response/response.js';

export const createCommission = async (req, res) => {
    try {
        const commission = await commissionsService.createCommission(req.body);
        success(req, res, commission, 201);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const getCommissions = async (req, res) => {
    try {
        const commissions = await commissionsService.getCommissions();
        success(req, res, commissions, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};
