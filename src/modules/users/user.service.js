import validators from '../../utils/validators/index.js';
import userRepository from './user.repository.js';
import notificationsService from '../notifications/notifications.service.js';
import AppError from '../../utils/errors/AppError.js';

const usersService = {
    getMyProfile: async (id) => {
        const user = await userRepository.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    },

    getUsers: async () => {
        const users = await userRepository.getUsers();

        if (!users) {
            throw new AppError('Users not found', 404);
        }

        return users;
    },

    updateMyProfile: async (userId, data) => {
        if (!userId) {
            throw new AppError("Invalid user", 400);
        }

        const errors = validators.validateUpdate(data);

        if (errors.length > 0) {
            throw new AppError(errors, 400);
        }

        const updatedUser = await userRepository.updateMyProfile(userId, data);

        if (!updatedUser) {
            throw new AppError('Fields Not Updated', 404);
        }

        return usersService.getMyProfile(userId);
    },

    getMyTestimony: async (id) => {
        if (!id) {
            throw new AppError("Invalid user", 400);
        }

        const testimony = await userRepository.getTestimonyByUserId(id);

        if (!testimony) {
            throw new AppError("Testimony not found", 404);
        }

        return testimony;
    },

    createTestimony: async (id, data) => {
        if (!id) {
            throw new AppError("Invalid user", 400);
        }

        if (!data.message || !validators.isString(data.message)) {
            throw new AppError("No valid fields provided for update", 400);
        }

        const userTestimony = await userRepository.getTestimonyByUserId(id);

        if (userTestimony) {
            throw new AppError("User already has a testimony", 400);
        }

        const testimony = await userRepository.createTestimony(id, data.message);

        if (!testimony) {
            throw new AppError("Testimony not created", 400);
        }

        const users = await userRepository.getUsersPermitNotification('createTestimony');

        users.forEach(async (user) => {
            await notificationsService.createNotification({
                userId: id,
                userIdNotify: user.userId,
                type: 'testimony',
                message: `${user.name} ha dado su testimonio`,
                body: {
                    testimonyId: testimony.testimonyId,
                }
            });
        });

        return {
            testimonyId: testimony.testimonyId,
            message: testimony.message,
            userId: testimony.userId
        };
    },

    updateTestimony: async (id, data) => {
        if (!id) {
            throw new AppError("Invalid user", 400);
        }

        const userTestimony = await userRepository.getTestimonyByUserId(id);

        if (!userTestimony) {
            throw new AppError("User has no testimony", 404);
        }

        const errors = validators.validateUpdate(data);

        if (errors.length > 0) {
            throw new AppError(errors, 400);
        }

        const updateTestimony = await userRepository.updateTestimony(id, data.message);

        if (!updateTestimony) {
            throw new AppError("Testimony not updated", 400);
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
            throw new AppError("Testimony not found", 404);
        }

        const deleteTestimony = await userRepository.deleteTestimony(testimony.testimonyId);

        if (!deleteTestimony) {
            throw new AppError("Testimony not deleted", 400);
        }

        return {
            message: "Testimony deleted",
            testimonyId: deleteTestimony.testimonyId
        };
    },

    getTestimonies: async () => {
        const testimonies = await userRepository.getTestimonies();

        return testimonies;
    },
};

export default usersService;