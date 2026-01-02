import salesService from './sales.service.js';
import { success, error } from '../../utils/response/response.js';

const salesController = {
    createSale: async (req, res) => {
        try {
            const sale = await salesService.createSale(req.body);
            success(req, res, sale, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getSales: async (req, res) => {
        try {
            const { id } = req.params;
            const sales = await salesService.getSales(id);
            success(req, res, sales, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getSaleById: async (req, res) => {
        try {
            const { id } = req.params;
            const sale = await salesService.getSalesById(id);
            success(req, res, sale, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getSalesSold: async (req, res) => {
        try {
            const sales = await salesService.getSalesSold();
            success(req, res, sales, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getSalesByUserId: async (req, res) => {
        try {
            const { userId } = req.user;
            const sales = await salesService.getSalesByUserId(userId);
            success(req, res, sales, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getSalesByPeriod: async (req, res) => {
        try {
            const { period } = req.params;
            const sales = await salesService.getSalesByPeriod(period);
            success(req, res, sales, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updateSaleStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const sale = await salesService.updateSaleStatus(id, req.body.status);
            success(req, res, sale, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },
}

export default salesController;