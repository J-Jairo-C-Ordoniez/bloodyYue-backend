import * as salesService from './sales.service.js';
import { success, error } from '../../utils/response/response.js';

export const createSale = async (req, res) => {
    try {
        const sale = await salesService.createSale(req.body);
        success(req, res, sale, 201);
    } catch (err) {
        error(req, res, err.message, err.statusCode);
    }
};

export const getSales = async (req, res) => {
    try {
        const sales = await salesService.getSales();
        success(req, res, sales, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};
