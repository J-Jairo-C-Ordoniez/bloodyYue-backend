import * as salesRepository from './sales.repository.js';

export const createSale = async (data) => {
    return salesRepository.create(data);
};

export const getSales = async () => {
    return salesRepository.getAll();
};
