import notificationsService from './notifications.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';

const notificationsController = {
    getNotificationsNotRead: asyncHandler(async (req, res) => {
        const { userId } = req.user
        const notifications = await notificationsService.getNotificationsNotRead(userId);
        success(req, res, notifications, 200);
    }),

    markAsRead: asyncHandler(async (req, res) => {
        const { notificationId } = req.params
        const result = await notificationsService.markAsRead(notificationId);
        success(req, res, result, 200);
    }),

    markAllAsRead: asyncHandler(async (req, res) => {
        const { userId } = req.user
        const result = await notificationsService.markAllAsRead(userId);
        success(req, res, result, 200);
    }),
};

export default notificationsController;