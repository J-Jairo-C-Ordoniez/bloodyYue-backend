import * as cartRepository from './cart.repository.js';

export const addToCart = async (data) => {
    const { userId, ...itemData } = data;
    let cart = await cartRepository.getCartByUserId(userId);
    if (!cart) {
        cart = await cartRepository.createCart(userId);
    }
    return await cartRepository.addItem(cart.cartId, itemData);
};

export const getCart = async (userId) => {
    const cart = await cartRepository.getCartByUserId(userId);
    if (!cart) {
        return { cartId: null, items: [] };
    }
    const items = await cartRepository.getItems(cart.cartId);
    return { ...cart, items };
};

export const removeItem = async (cartItemId) => {
    return await cartRepository.removeItem(cartItemId);
};

export const updateItem = async (cartItemId, data) => {
    return await cartRepository.updateItem(cartItemId, data);
};
