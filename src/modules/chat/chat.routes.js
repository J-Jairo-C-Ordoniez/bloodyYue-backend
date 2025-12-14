import { Router } from 'express';
import * as chatController from './chat.controller.js';

const router = Router();

router.post('/', chatController.sendMessage);
router.get('/:conversationId', chatController.getMessages);

export default router;
