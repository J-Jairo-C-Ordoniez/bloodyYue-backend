import { Router } from 'express';
import notificationsController from './notifications.controller.js';

const router = Router();

router.get(
    '/', 
    notificationsController.getNotifications
);

router.put(
    '/:notificationId/read', 
    notificationsController.markAsRead
);

router.put(
    '/read-all', 
    notificationsController.markAllAsRead
);

export default router;