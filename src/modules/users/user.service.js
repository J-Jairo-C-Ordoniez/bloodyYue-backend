import * as userRepository from './user.repository.js';

export const getAll = async () => {
    return userRepository.getAll();
};

export const getById = async (id) => {
    return userRepository.getById(id);
};
