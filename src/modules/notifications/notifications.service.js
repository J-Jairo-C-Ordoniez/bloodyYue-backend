import notificationsRepository from './notifications.repository.js';
import validators from '../../utils/validators/index.js';
import { getIO } from '../../config/socket.config.js';

const notificationsService = {
    createNotificationGlobal: async (data) => {
        const {userId, type, message, body} = data;
        const io = getIO();
        if (
            (!userId) ||
            (!type && validators.isString(type)) ||
            (!message && validators.isString(message))
        ) {
            throw ({message: 'Input invalid data', statusCode: 400});
        }

        io.emit('newNotification', {
            title: 'New notification',
            message,
            userId,
            type,
            body
        });

        return {message: 'Notification created successfully'};
    },

    createNotification: async (data) => {
        const {userId, userIdNotify, type, message, body} = data;
        const io = getIO();

        if (
            (!userId) ||
            (!userIdNotify) ||
            (!type && validators.isString(type)) ||
            (!message && validators.isString(message))
        ) {
            throw ({message: 'Input invalid data', statusCode: 400});
        }

        const newNotification = await notificationsRepository.create({
            userId: userIdNotify,
            type,
            message
        });

        if (!newNotification) {
            throw ({message: 'Notification creation failed', statusCode: 500});
        }

        io.to(`notificationUser-${userIdNotify}`).emit('newNotification', {
            notificationId: newNotification.notificationId,
            userId,
            title: 'New notification',
            message,
            type,
            body
        });

        return newNotification;
    },

    createNotificationPostReaction: async (data) => {
        const {userIdNotify, userId, type, message} = data;
        const io = getIO();

        if (
            (!userIdNotify) ||
            (!userId) ||
            (!type && validators.isString(type)) ||
            (!message && validators.isString(message))
        ) {
            throw ({message: 'Input invalid data', statusCode: 400});
        }

        const newNotification = await notificationsRepository.create({
            userId: userIdNotify,
            type,
            message
        });

        if (!newNotification) {
            throw ({message: 'Notification creation failed', statusCode: 500});
        }

        io.to(`notificationUser-${userIdNotify}`).emit('newNotification', {
            notificationId: newNotification.notificationId,
            title: 'New notification',
            userId,
            type,
            message,
            read: false
        });

        return newNotification;
    },

    getNotificationsNotRead: async (userId) => {
        const notifications = await notificationsRepository.getByUserId(userId);
        if (!notifications) {
            throw ({message: 'Notifications not found', statusCode: 404});
        }
        return notifications;
    },

    getNotificationsNotReadById: async (notificationId) => {
        const notification = await notificationsRepository.getById(notificationId);
        if (!notification) {
            throw ({message: 'Notification not found', statusCode: 404});
        }

        return notification;
    },

    markAsRead: async (notificationId) => {
        const notification = await notificationsRepository.markAsRead(notificationId);
        if (!notification) {
            throw ({message: 'Notification not found', statusCode: 404});
        }

        return notificationsService.getNotificationsNotReadById(notificationId);
    },

    markAllAsRead: async (userId) => {
        const notifications = await notificationsRepository.markAllAsRead(userId);
        if (!notifications) {
            throw ({message: 'Notifications not found', statusCode: 404});
        }

        return notificationsService.getNotificationsNotRead(userId);
    },
};

export default notificationsService;