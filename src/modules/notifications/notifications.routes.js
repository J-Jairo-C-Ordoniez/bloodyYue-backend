import { Router } from 'express';
import notificationsController from './notifications.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';

const router = Router();

router.get(
    '/', 
    authenticate,
    notificationsController.getNotificationsNotRead
);

router.put(
    '/:notificationId/read', 
    authenticate,
    notificationsController.markAsRead
);

router.put(
    '/read-all',    
    authenticate,
    notificationsController.markAllAsRead
);

export default router;