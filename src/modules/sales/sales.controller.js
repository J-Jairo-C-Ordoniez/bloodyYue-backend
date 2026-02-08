import salesService from './sales.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';

const salesController = {
    createSale: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const sale = await salesService.createSale(userId, req.body);
        success(req, res, sale, 201);
    }),

    getSales: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const sales = await salesService.getSales(id);
        success(req, res, sales, 200);
    }),

    getSaleById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const sale = await salesService.getSalesById(id);
        success(req, res, sale, 200);
    }),

    getSalesSold: asyncHandler(async (req, res) => {
        const sales = await salesService.getSalesSold();
        success(req, res, sales, 200);
    }),

    getSalesByUserId: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const sales = await salesService.getSalesByUserId(userId);
        success(req, res, sales, 200);
    }),

    getSalesByPeriod: asyncHandler(async (req, res) => {
        const { period } = req.params;
        const sales = await salesService.getSalesByPeriod(period);
        success(req, res, sales, 200);
    }),

    getDetailsSale: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const detailsSale = await salesService.getDetailsSale(id);
        success(req, res, detailsSale, 200);
    }),

    updateDetailsSaleStatus: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        const { userId } = req.user;

        const detailsSale = await salesService.updateDetailsSaleStatus(userId, id, status);
        success(req, res, detailsSale, 200);
    }),

    updateSaleStatus: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { userId } = req.user;
        const sale = await salesService.updateSaleStatus(userId, id, req.body.status);
        success(req, res, sale, 200);
    }),
}

export default salesController;