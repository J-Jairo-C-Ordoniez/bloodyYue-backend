import notificationsRepository from './notifications.repository.js';
import validators from '../../utils/validators/index.js';
import { getIO } from '../../config/socket.config.js';

const notificationsService = {
    createNotification: async (data) => {
        const {userId, type, message, content} = data;
        const io = getIO();

        if (
            (!userId) ||
            (!type && validators.isString(type)) ||
            (!message && validators.isString(message)) ||
            (!content && validators.isLink(content))
        ) {
            throw ({message: 'Input invalid data', statusCode: 400});
        }

        const newNotification = await notificationsRepository.create({
            userId,
            type,
            message
        });

        if (!newNotification) {
            throw ({message: 'Notification creation failed', statusCode: 500});
        }

        io.emit('newNotification', {
            notificationId: newNotification.notificationId,
            title: 'New notification',
            userId,
            type,
            message,
            content,
            read: false,
            createdAt: newNotification.createdAt
        });

        return newNotification;
    },

    getNotifications: async (userId) => {
        return await notificationsRepository.getByUserId(userId);
    },

    markAsRead: async (notificationId) => {
        return await notificationsRepository.markAsRead(notificationId);
    },

    markAllAsRead: async (userId) => {
        return await notificationsRepository.markAllAsRead(userId);
    },
};

export default notificationsService;