import cartService from './cart.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';

const cartController = {
    addToCart: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const item = await cartService.addToCart(userId, req.body);
        success(req, res, item, 201);
    }),

    getAllItemsCart: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const cart = await cartService.getAllItemsCart(userId);
        success(req, res, cart, 200);
    }),

    getItemById: asyncHandler(async (req, res) => {
        const { cartItemId } = req.params;
        const item = await cartService.getItemById(cartItemId);
        success(req, res, item, 200);
    }),

    updateItem: asyncHandler(async (req, res) => {
        const { cartItemId } = req.params;
        const item = await cartService.updateItem(cartItemId, req.body);
        success(req, res, item, 200);
    }),

    changeItemStatus: asyncHandler(async (req, res) => {
        const { cartItemId } = req.params;
        const item = await cartService.changeItemStatus(cartItemId);
        success(req, res, item, 200);
    })
}

export default cartController;