import * as notificationsService from './notifications.service.js';
import { success, error } from '../../utils/response/response.js';

export const getNotifications = async (req, res) => {
    try {
        const notifications = await notificationsService.getNotifications(req.params.userId);
        success(req, res, notifications, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};

export const markAsRead = async (req, res) => {
    try {
        const result = await notificationsService.markAsRead(req.params.notificationId);
        success(req, res, { updated: result }, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};

export const markAllAsRead = async (req, res) => {
    try {
        const result = await notificationsService.markAllAsRead(req.params.userId);
        success(req, res, { updated: result }, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};
