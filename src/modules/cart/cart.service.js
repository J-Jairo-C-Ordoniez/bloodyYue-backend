import cartRepository from "./cart.repository.js";
import commissionRepository from "../commissions/commissions.repository.js";
import validators from "../../utils/validators/index.js";

const cartService = {
    addToCart: async (userId, data) => {
        let cart = await cartRepository.getCartByUserId(userId);
        if (!cart) {
            throw ({ message: 'Cart not found', statusCode: 404 });
        }

        if (
            (!data.commissionId) ||
            (!data.quantity && validators.isNumber(data.quantity)) ||
            (!data.priceAtMoment && validators.isPrice(data.priceAtMoment)) ||
            (!data.details && validators.isString(data.details))
        ) {
            throw ({ message: 'Invalid input data', statusCode: 400 });
        }

        const commission = await commissionRepository.getCommissionById(data.commissionId);
        if (!commission) {
            throw ({ message: 'Commission not found', statusCode: 404 });
        }

        const item = await cartRepository.addItem({
            cartId: cart.cartId,
            commissionId: data.commissionId,
            quantity: data.quantity,
            priceAtMoment: data.priceAtMoment,
            details: data.details
        });

        if (!item) {
            throw ({ message: 'Item not found', statusCode: 404 });
        }

        return item;
    },

    getAllItemsCart: async (userId) => {
        const cart = await cartRepository.getCartByUserId(userId);
        if (!cart) {
            throw ({ message: 'Cart not found', statusCode: 404 });
        }

        const items = await cartRepository.getItems(cart.cartId);
        if (!items) {
            throw ({ message: 'Items not found', statusCode: 404 });
        }

        return items;
    },

    getItemById: async (cartItemId) => {
        const cartItem = await cartRepository.getCartItemById(cartItemId);
        if (!cartItem) {
            throw ({ message: 'Cart item not found', statusCode: 404 });
        }

        return cartItem;
    },

    updateItem: async (cartItemId, data) => {
        const cartItem = await cartRepository.getCartItemById(cartItemId);
        if (!cartItem) {
            throw ({ message: 'Cart item not found', statusCode: 404 });
        }

        const errors = validators.validateUpdate(data);
        if (errors.length > 0) {
            throw ({ message: 'Invalid input data', statusCode: 400 });
        }

        const updated = await cartRepository.updateItem(cartItemId, data);
        if (!updated) {
            throw ({ message: 'Details cart item update failed', statusCode: 400 });
        }

        return cartService.getItemById(cartItemId);
    },

    changeItemStatus: async (cartItemId) => {
        const cartItem = await cartRepository.getCartItemById(cartItemId);
        if (!cartItem) {
            throw ({ message: 'Cart item not found', statusCode: 404 });
        }

        const updated = await cartRepository.changeItemStatus(cartItemId, 'discarded');
        if (!updated) {
            throw ({ message: 'Status cart item update failed', statusCode: 400 });
        }

        return cartService.getItemById(cartItemId);
    }
};

export default cartService;