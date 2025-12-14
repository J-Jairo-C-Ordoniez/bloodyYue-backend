import * as notificationsRepository from './notifications.repository.js';

export const createNotification = async (data) => {
    return notificationsRepository.create(data);
};

export const getNotifications = async (userId) => {
    return notificationsRepository.getByUserId(userId);
};
