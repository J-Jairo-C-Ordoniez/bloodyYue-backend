import chatService from './chat.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';

const chatController = {
    createChat: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const chat = await chatService.createChat(userId, req.body.participantId);
        success(req, res, chat, 200);
    }),

    getChatsRoom: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const chatsRoom = await chatService.getChatsRoom(userId);
        success(req, res, chatsRoom, 200);
    }),

    getMessages: asyncHandler(async (req, res) => {
        const chatId = req.params.chatId;
        const messages = await chatService.getMessages(chatId);
        success(req, res, messages, 200);
    }),
};

export default chatController;