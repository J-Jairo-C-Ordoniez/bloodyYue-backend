import { Router } from 'express';
import chatController from './chat.controller.js';

const router = Router();

router.post('/', chatController.createChat);
router.get('/', chatController.getChatsRoom);
router.put('/chatId/:chatId/:userId', chatController.getMessages);

export default router;