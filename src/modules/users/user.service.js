import * as userRepository from './user.repository.js';

const usersService = {
    getMyProfile: async (id) => {
        const user = await userRepository.getMyProfile(id);

        if(!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    },

    updateMyProfile: async (id, body) => {
        return userRepository.updateMyProfile(id, body);
    },
    
    changeStatus: async (id, body) => {
        return userRepository.changeStatus(id, body);
    },

    getMyTestimonies: async (id) => {
        return userRepository.getMyTestimonies(id);
    },

    createTestimony: async (id, body) => {
        return userRepository.createTestimony(id, body);
    },

    updateTestimony: async (id, body) => {
        return userRepository.updateTestimony(id, body);
    },

    deleteTestimony: async (id, body) => {
        return userRepository.deleteTestimony(id, body);
    }
};

export default usersService;