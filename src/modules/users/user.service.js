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

    updateMyProfile: async (userId, data) => {
        if (!userId) {
            throw ({ message: "Invalid user", statusCode: 400 });
        }

        const errors = validators.validateUpdate(data);

        if (errors.length > 0) {
            throw ({ message: errors, statusCode: 400 });
        }

        const updatedUser = await userRepository.updateMyProfile(userId, data);

        if (!updatedUser) {
            throw new AppError('Fields Not Updated', 404);
        }

        return usersService.getMyProfile(id);
    },

    getMyTestimony: async (id) => {
        if (!id) {
            throw ({ message: "Invalid user", statusCode: 400 });
        }

        const testimony = await userRepository.getTestimonyByUserId(id);

        if (!testimony) {
            throw ({ message: "Testimony not found", statusCode: 404 });
        }

        return testimony;
    },

    createTestimony: async (id, data) => {
        if (!id) {
            throw ({ message: "Invalid user", statusCode: 400 });
        }

        if (!data.message || !validators.isString(data.message)) {
            throw ({ message: "No valid fields provided for update", statusCode: 400 });
        }

        const userTestimony = await userRepository.getTestimonyByUserId(id);

        if (userTestimony) {
            throw ({ message: "User already has a testimony", statusCode: 400 });
        }

        const testimony = await userRepository.createTestimony(id, data.message);

        if (!testimony) {
            throw ({ message: "Testimony not created", statusCode: 400 });
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
        if (!id) {
            throw ({ message: "Invalid user", statusCode: 400 });
        }

        const userTestimony = await userRepository.getTestimonyByUserId(id);

        if (!userTestimony) {
            throw ({ message: "User has no testimony", statusCode: 404 });
        }

        const errors = validators.validateUpdate(data);

        if (errors.length > 0) {
            throw ({ message: errors, statusCode: 400 });
        }

        const updateTestimony = await userRepository.updateTestimony(id, data.message);

        if (!updateTestimony) {
            throw ({ message: "Testimony not updated", statusCode: 400 });
        }

        return {
            testimony: {
                testimonyId: updateTestimony.testimonyId,
                message: updateTestimony.message,
                userId: updateTestimony.userId
            }
        };
    },

    deleteTestimony: async (userId) => {
        const testimony = await userRepository.getTestimonyByUserId(userId);

        if (!testimony) {
            throw ({ message: "Testimony not found", statusCode: 404 });
        }

        const deleteTestimony = await userRepository.deleteTestimony(testimony.testimonyId);

        if (!deleteTestimony) {
            throw ({ message: "Testimony not deleted", statusCode: 400 });
        }

        return {
            message: "Testimony deleted",
            testimonyId: deleteTestimony.testimonyId
        };
    },

    getTestimonies: async () => {
        const testimonies = await userRepository.getTestimonies();

        if (!testimonies) {
            throw ({ message: "Testimonies not found", statusCode: 404 });
        }

        return testimonies;
    },
};

export default usersService;