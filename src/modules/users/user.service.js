import userRepository from './user.repository.js';

const usersService = {
    getMyProfile: async (id) => {
        const user = await userRepository.getUserById(id);

        if(!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    },

    updateMyProfile: async (id, body) => {
        const user = await userRepository.getUserById(id);

        if(!user) {
            throw new AppError('User not found', 404);
        }

        /*  
            name
            birthday
            email
            password
            avatar
            poster
        */

        const updatedUser = await userRepository.updateMyProfile(id, body);

        return updatedUser;
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