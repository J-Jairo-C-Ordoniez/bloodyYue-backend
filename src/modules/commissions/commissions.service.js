import * as commissionsRepository from './commissions.repository.js';

export const createCommission = async (data) => {
    return commissionsRepository.create(data);
};

export const getCommissions = async () => {
    return commissionsRepository.getAll();
};
