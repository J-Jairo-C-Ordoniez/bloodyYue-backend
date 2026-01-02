import * as notificationsRepository from './notifications.repository.js';

export const createNotification = async (data) => {
    return await notificationsRepository.create(data);
};

export const getNotifications = async (userId) => {
    return await notificationsRepository.getByUserId(userId);
};

export const markAsRead = async (notificationId) => {
    return await notificationsRepository.markAsRead(notificationId);
};

export const markAllAsRead = async (userId) => {
    return await notificationsRepository.markAllAsRead(userId);
};
