import * as cartService from './cart.service.js';
import { success, error } from '../../utils/response/response.js';

export const addToCart = async (req, res) => {
    try {
        const item = await cartService.addToCart(req.body); // Body should contain userId, commissionId, etc.
        success(req, res, item, 201);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.params.userId);
        success(req, res, cart, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};

export const removeItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        await cartService.removeItem(cartItemId);
        success(req, res, { message: 'Item removed' }, 200);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const updateItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        await cartService.updateItem(cartItemId, req.body);
        success(req, res, { message: 'Item updated' }, 200);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};
