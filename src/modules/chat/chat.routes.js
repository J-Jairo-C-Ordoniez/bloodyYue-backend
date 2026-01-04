import { Router } from 'express';
import chatController from './chat.controller.js';

const router = Router();

router.post('/send', chatController.sendMessage);
router.get('/:userId', chatController.getMessages);
router.put('/read/:userId', chatController.markAsRead);

export default router;


/* 



*/