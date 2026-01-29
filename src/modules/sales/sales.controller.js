import salesService from './sales.service.js';
import { success, error } from '../../utils/response/response.js';

const salesController = {
    createSale: async (req, res) => {
        try {
            const { userId } = req.user;
            const sale = await salesService.createSale(userId, req.body);

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
            const { userId } = req.user;
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

    getDetailsSale: async (req, res) => {
        try {
            const { id } = req.params;
            const detailsSale = await salesService.getDetailsSale(id);
            success(req, res, detailsSale, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updateDetailsSaleStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const { userId } = req.user;

            const detailsSale = await salesService.updateDetailsSaleStatus(userId, id, status);
            success(req, res, detailsSale, 200);
        } catch (err) {

            error(req, res, err.message, err.statusCode);
        }
    },

    updateSaleStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.user;
            const sale = await salesService.updateSaleStatus(userId, id, req.body.status);
            success(req, res, sale, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },
}

export default salesController;