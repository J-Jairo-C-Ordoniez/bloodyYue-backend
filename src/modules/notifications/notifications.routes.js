import { Router } from 'express';
import * as notificationsController from './notifications.controller.js';

const router = Router();

router.get('/:userId', notificationsController.getNotifications);
router.put('/:notificationId/read', notificationsController.markAsRead);
router.put('/read-all/:userId', notificationsController.markAllAsRead);

export default router;
