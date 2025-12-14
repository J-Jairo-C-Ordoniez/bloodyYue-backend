import * as cartRepository from './cart.repository.js';

export const addToCart = async (data) => {
    return cartRepository.addItem(data);
};

export const getCart = async (userId) => {
    return cartRepository.getItems(userId);
};
