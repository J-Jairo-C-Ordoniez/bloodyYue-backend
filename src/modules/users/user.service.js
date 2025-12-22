import validators from '../../utils/validators/index.js';
import userRepository from './user.repository.js';

const usersService = {
    getMyProfile: async (id) => {
        const user = await userRepository.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    },

    updateMyProfile: async (id, data) => {
        const user = await userRepository.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const errors = validators.validateUpdate(data);

        if (errors.length > 0) {
            throw new AppError(errors, 400);
        }

        if (Object.keys(data).length === 0) {
            throw new AppError('No valid fields provided for update', 400);
        }

        const updatedUser = await userRepository.updateMyProfile(id, data);

        if (!updatedUser) {
            throw new AppError('Fields Not Updated', 404);
        }

        return usersService.getMyProfile(id);
    },

    changeStatus: async (id, data) => {
        const user = await userRepository.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const updateStatus = await userRepository.changeStatus(id, data.status);

        if (!updateStatus) {
            throw new AppError('Field Not Updated', 404);
        }

        return usersService.getMyProfile(id);
    },

    getMyTestimony: async (id) => {
        const user = await userRepository.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const testimony = await userRepository.getTestimonyByUserId(id);

        if (!testimony) {
            throw new AppError('Testimony not found', 404);
        }

        return testimony;
    },

    createTestimony: async (id, data) => {
        const user = await userRepository.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        if (!data.message || !validators.isString(data.message)) {
            throw new AppError('No valid fields provided for update', 400);
        }

        const userTestimony = await userRepository.getTestimonyByUserId(id);

        if (userTestimony) {
            throw new AppError('User already has a testimony', 400);
        }

        const testimony = await userRepository.createTestimony(id, data.message);

        if (!testimony) {
            throw new AppError('Testimony not created', 400);
        }

        return {
            testimony: {
                testimonyId: testimony.testimonyId,
                message: testimony.message,
                userId: testimony.userId
            }
        };
    },

    updateTestimony: async (id, data) => {
        const user = await userRepository.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const userTestimony = await userRepository.getTestimonyByUserId(id);

        if (!userTestimony) {
            throw new AppError('User has no testimony', 404);
        }

        if (!data.message || !validators.isString(data.message)) {
            throw new AppError('No valid fields provided for update', 400);
        }

        const updateTestimony = await userRepository.updateTestimony(id, data.message);

        if (!updateTestimony) {
            throw new AppError('Testimony not updated', 400);
        }

        return {
            testimony: {
                testimonyId: updateTestimony.testimonyId,
                message: updateTestimony.message,
                userId: updateTestimony.userId
            }
        };
    },

    deleteTestimony: async (testimonyId) => {
        const testimony = await userRepository.getTestimonyById(testimonyId);

        if (!testimony) {
            throw new AppError('Testimony not found', 404);
        }

        const deleteTestimony = await userRepository.deleteTestimony(testimonyId);

        if (!deleteTestimony) {
            throw new AppError('Testimony not deleted', 400);
        }

        return {
            testimony: {
                testimonyId: deleteTestimony.testimonyId
            }
        };
    }
};

export default usersService;