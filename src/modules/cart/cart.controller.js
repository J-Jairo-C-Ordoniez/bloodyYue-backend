import * as cartService from './cart.service.js';
import { success, error } from '../../utils/response/response.js';

export const addToCart = async (req, res) => {
    try {
        const item = await cartService.addToCart(req.body);
        success(req, res, item, 201);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.params.userId); // Assuming userId is passed or from auth
        success(req, res, cart, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};
