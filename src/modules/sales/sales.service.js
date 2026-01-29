import salesRepository from './sales.repository.js';
import cartRepository from '../cart/cart.repository.js';
import validators from '../../utils/validators/index.js'
import notificationsService from '../notifications/notifications.service.js';
import usersRepository from '../users/user.repository.js';
import commissionRepository from '../commissions/commissions.repository.js';
import chatService from '../chat/chat.service.js';
import AppError from '../../utils/errors/AppError.js';

const salesService = {
    createSale: async (userId, data) => {
        const { cartItemId, total, paymentMethod } = data;

        if (
            (!cartItemId) ||
            (!total && validators.isPrice(total)) ||
            (!paymentMethod && validators.isString(paymentMethod))
        ) {
            throw new AppError('Missing required fields', 400);
        }

        const cartItem = await cartRepository.getCartItemById(cartItemId);
        if (!cartItem) {
            throw new AppError('Cart item not found', 404);
        }

        const sale = await salesRepository.createSale({
            cartItemId,
            total,
            paymentMethod,
        });

        const users = await usersRepository.getUsersPermitNotification('readNewsales');

        users.forEach(async (user) => {
            await notificationsService.createNotificationGlobal({
                userId,
                type: 'sale',
                message: `${user.name} ha hecho una compra`,
                body: {
                    saleId: sale.saleId,
                }
            });
        });

        return sale;
    },

    getSales: async (id) => {
        if (!id) {
            throw new AppError('Missing required fields', 400);
        }

        const sales = await salesRepository.getSales(id);
        if (!sales) {
            throw new AppError('Sales not found', 404);
        }

        return sales;
    },

    getSalesById: async (id) => {
        if (!id) {
            throw new AppError('Missing required fields', 400);
        }

        const sale = await salesRepository.getSalesById(id);
        if (!sale) {
            throw new AppError('Sale not found', 404);
        }

        const commission = await commissionRepository.getCommissionsById(sale.commissionId);
        if (!commission) {
            throw new AppError('Commission not found', 404);
        }

        return { sale, commission };
    },

    getSalesSold: async () => {
        const sales = await salesRepository.getSalesSold();
        if (!sales) {
            throw new AppError('Sales not found', 404);
        }

        return sales;
    },

    getSalesByUserId: async (userId) => {
        if (!userId) {
            throw new AppError('Missing required fields', 400);
        }

        const sales = await salesRepository.getSalesByUserId(userId);
        if (!sales) {
            throw new AppError('Sales not found', 404);
        }

        return sales;
    },

    getSalesByPeriod: async (period) => {
        if (!period && validators.isPeriod(period)) {
            throw new AppError('Missing required fields', 400);
        }

        const sales = await salesRepository.getSalesByPeriod(period.toUpperCase());
        if (!sales) {
            throw new AppError('Sales not found', 404);
        }

        return sales;
    },

    getDetailsSale: async (id) => {
        if (!id) {
            throw new AppError('Missing required fields', 400);
        }

        const detailsSale = await salesRepository.getDetailsSale(id);
        if (!detailsSale) {
            throw new AppError('Details sale not found', 404);
        }

        return detailsSale;
    },

    updateDetailsSaleStatus: async (userId, id, status) => {
        if (!id && validators.isString(status)) {
            throw new AppError('Missing required fields', 400);
        }

        const detailsSale = await salesRepository.getDetailsSale(id);
        if (!detailsSale) {
            throw new AppError("Details sale not found", 404);
        }

        const updated = await salesRepository.updateDetailsSaleStatus(id, status);
        if (!updated) {
            throw new AppError("Details sale update failed", 500);
        }

        const user = await usersRepository.getUserById(userId);

        if (!user && !detailsSale.userId) {
            throw new AppError("User not found", 404);
        }

        await notificationsService.createNotification({
            userId,
            userIdNotify: detailsSale.userId,
            type: 'sale',
            message: `${user.name} ha actualizado el estado de la compra`,
            body: {
                detailsSaleId: detailsSale.detailsSaleId,
            }
        });

        if (status === 'done') {
            const usersDesactiveChat = await usersRepository.getUsersPermitNotification('readUpdatedSales');
            usersDesactiveChat.forEach(async (user) => {
                await chatService.changeStatusChat({
                    participantOneId: detailsSale.userId,
                    participantTwoId: user.userId
                }, false);
            });
        }




        return salesService.getDetailsSale(id);
    },

    updateSaleStatus: async (userId, id, status) => {
        if (!id && validators.isString(status)) {
            throw new AppError('Missing required fields', 400);
        }

        const sale = await salesRepository.getSalesById(id);
        if (!sale) {
            throw new AppError("Sale not found", 404);
        }

        const updated = await salesRepository.updateSaleStatus(id, status);
        if (!updated) {
            throw new AppError("Sale update failed", 500);
        }


        if (status !== 'paid') return salesService.getSalesById(id);

        await salesRepository.createDetailsSale({
            saleId: id,
            status: 'pending',
        });

        await cartRepository.changeItemStatus(
            sale.cartItemId,
            'purchased'
        );

        const users = await usersRepository.getUsersPermitNotification('readUpdatedSales');
        const userSale = await usersRepository.getUserById(userId);

        users.forEach(async (user) => {
            await notificationsService.createNotification({
                userId,
                userIdNotify: user.userId,
                type: 'sale',
                message: `${userSale.name} ha completado una compra`,
                body: {
                    saleId: sale.saleId,
                }
            });

            await chatService.changeStatusChat({
                participantOneId: userId,
                participantTwoId: user.userId
            }, true);

        });

        return salesService.getSalesById(id);
    }
};

export default salesService;