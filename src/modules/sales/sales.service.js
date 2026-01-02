import salesRepository from './sales.repository.js';
import cartRepository from '../cart/cart.repository.js';
import validators from '../../utils/validators/index.js'

const salesService = {
    createSale: async (data) => {
        const { cartItemId, total, paymentMethod } = data;

        if (
            (!cartItemId) || 
            (!total && validators.isPrice(total)) || 
            (!paymentMethod && validators.isString(paymentMethod))
        ) {
            throw ({message: 'Missing required fields', statusCode: 400});
        }

        const cartItem = await cartRepository.getCartItemById(cartItemId);
        if (!cartItem) {
            throw ({message: 'Cart item not found', statusCode: 404});
        }

        const sale = await salesRepository.createSale({
            cartItemId,
            total,
            paymentMethod,
        });

        return sale;
    },

    getSales: async (id) => {
        if (!id) {
            throw ({message: 'Missing required fields', statusCode: 400});
        }

        const sales = await salesRepository.getSales(id);
        if (!sales) {
            throw ({message: 'Sales not found', statusCode: 404});
        }

        return sales;
    },

    getSalesById: async (id) => {
        if (!id) {
            throw ({message: 'Missing required fields', statusCode: 400});
        }

        const sale = await salesRepository.getSalesById(id);
        if (!sale) {
            throw ({message: 'Sale not found', statusCode: 404});
        }

        return sale;
    },

    getSalesSold: async () => {
        const sales = await salesRepository.getSalesSold();
        if (!sales) {
            throw ({message: 'Sales not found', statusCode: 404});
        }

        return sales;
    },

    getSalesByUserId: async (userId) => {
        if (!userId) {
            throw ({message: 'Missing required fields', statusCode: 400});
        }

        const sales = await salesRepository.getSalesByUserId(userId);
        if (!sales) {
            throw ({message: 'Sales not found', statusCode: 404});
        }

        return sales;
    },

    getSalesByPeriod: async (period) => {
        if (!period && validators.isPeriod(period)) {
            throw ({message: 'Missing required fields', statusCode: 400});
        }

        const sales = await salesRepository.getSalesByPeriod(period.toUpperCase());
        if (!sales) {
            throw ({message: 'Sales not found', statusCode: 404});
        }

        return sales;
    },

    updateSaleStatus: async (id, status) => {
        if (!id && validators.isString(status)) {
            throw ({message: 'Missing required fields', statusCode: 400});
        }

        const sale = await salesRepository.getSalesById(id);
        if (!sale) {
            throw ({ message: "Sale not found", statusCode: 404 });
        }

        const updated = await salesRepository.updateSaleStatus(id, status);
        if (!updated) {
            throw ({ message: "Sale update failed", statusCode: 500 });
        }

        if (status === 'paid') {
            await salesRepository.createDetailsSale({
                saleId: id,
                status: 'pending',
            });
        }

        return salesService.getSalesById(id);
    },
};

export default salesService;