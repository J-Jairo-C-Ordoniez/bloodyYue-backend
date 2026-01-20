import notificationsService from './notifications.service.js';
import { success, error } from '../../utils/response/response.js';


const notificationsController = {
    getNotificationsNotRead: async (req, res) => {
        try {
            const {userId} = req.user
            const notifications = await notificationsService.getNotificationsNotRead(userId);
            success(req, res, notifications, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    markAsRead: async (req, res) => {
        try {
            const {notificationId} = req.params
            const result = await notificationsService.markAsRead(notificationId);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    markAllAsRead: async (req, res) => {
        try {
            const {userId} = req.user
            const result = await notificationsService.markAllAsRead(userId);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },
};

export default notificationsController;