import { Router } from 'express';
import chatController from './chat.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';

const router = Router();

router.post(
    '/',
    authenticate,
    chatController.createChat
);

router.get(
    '/',
    authenticate,
    chatController.getChatsRoom
);

router.get(
    '/:chatId',
    authenticate,
    chatController.getMessages
);

export default router;