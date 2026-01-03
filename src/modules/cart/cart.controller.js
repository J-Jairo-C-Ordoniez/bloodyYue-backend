import cartService from './cart.service.js';
import { success, error } from '../../utils/response/response.js';

const cartController = {
    addToCart: async (req, res) => {
        try {
            const {userId} = req.user;
            const item = await cartService.addToCart(userId, req.body);
            success(req, res, item, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getAllItemsCart: async (req, res) => {
        try {
            const {userId} = req.user;
            const cart = await cartService.getAllItemsCart(userId);
            success(req, res, cart, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getItemById: async (req, res) => {
        try {
            const {cartItemId} = req.params;
            const item = await cartService.getItemById(cartItemId);
            success(req, res, item, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updateItem: async (req, res) => {
        try {
            const {cartItemId} = req.params;
            const item = await cartService.updateItem(cartItemId, req.body);
            success(req, res, item, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    changeItemStatus: async (req, res) => {
        try {
            const {cartItemId} = req.params;
            const item = await cartService.changeItemStatus(cartItemId);
            success(req, res, item, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    }
}

export default cartController;