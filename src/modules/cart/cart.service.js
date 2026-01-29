import cartRepository from "./cart.repository.js";
import commissionRepository from "../commissions/commissions.repository.js";
import validators from "../../utils/validators/index.js";
import AppError from "../../utils/errors/AppError.js";

const cartService = {
    addToCart: async (userId, data) => {
        let cart = await cartRepository.getCartByUserId(userId);
        if (!cart) {
            throw new AppError('Cart not found', 404);
        }

        if (
            (!data.commissionId) ||
            (!data.quantity && validators.isNumber(data.quantity)) ||
            (!data.priceAtMoment && validators.isPrice(data.priceAtMoment)) ||
            (!data.details && validators.isString(data.details))
        ) {
            throw new AppError('Invalid input data', 400);
        }

        const commission = await commissionRepository.getCommissionsById(data.commissionId);
        if (!commission) {
            throw new AppError('Commission not found', 404);
        }

        const item = await cartRepository.addItem({
            cartId: cart.cartId,
            commissionId: data.commissionId,
            quantity: data.quantity,
            priceAtMoment: data.priceAtMoment,
            details: data.details
        });

        if (!item) {
            throw new AppError('Item not found', 404);
        }

        return item;
    },

    getAllItemsCart: async (userId) => {
        const cart = await cartRepository.getCartByUserId(userId);
        if (!cart) {
            throw new AppError('Cart not found', 404);
        }

        const items = await cartRepository.getItems(cart.cartId);
        if (!items) {
            throw new AppError('Items not found', 404);
        }

        return items;
    },

    getItemById: async (cartItemId) => {
        const cartItem = await cartRepository.getCartItemById(cartItemId);
        if (!cartItem) {
            throw new AppError('Cart item not found', 404);
        }

        const commission = await commissionRepository.getCommissionsById(cartItem.commissionId);
        if (!commission) {
            throw new AppError('Commission not found', 404);
        }

        return { cartItem, commission };
    },

    updateItem: async (cartItemId, data) => {
        const cartItem = await cartRepository.getCartItemById(cartItemId);
        if (!cartItem) {
            throw new AppError('Cart item not found', 404);
        }

        const errors = validators.validateUpdate(data);
        if (errors.length > 0) {
            throw new AppError('Invalid input data', 400);
        }

        const updated = await cartRepository.updateItem(cartItemId, data);
        if (!updated) {
            throw new AppError('Details cart item update failed', 400);
        }

        return cartService.getItemById(cartItemId);
    },

    changeItemStatus: async (cartItemId) => {
        const cartItem = await cartRepository.getCartItemById(cartItemId);
        if (!cartItem) {
            throw new AppError('Cart item not found', 404);
        }

        const updated = await cartRepository.changeItemStatus(cartItemId, 'discarded');
        if (!updated) {
            throw new AppError('Status cart item update failed', 400);
        }

        return cartService.getItemById(cartItemId);
    }
};

export default cartService;