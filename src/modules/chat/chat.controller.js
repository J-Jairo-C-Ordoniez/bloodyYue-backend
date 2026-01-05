import chatService from './chat.service.js';
import { success, error } from '../../utils/response/response.js';

const chatController = {
    getChatsRoom: async (req, res) => {
        try {
            const {userId} = req.user;
            const chatsRoom = await chatService.getChatsRoom(userId);
            success(req, res, chatsRoom, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getMessages: async (req, res) => {
        try {
            const {userId} = req.user;
            const chatId = req.params.chatId;
            const messages = await chatService.getMessages(chatId);
            success(req, res, messages, 200);
        } catch (err) {
            error(req, res, err.message, 500);
        }
    },
};


export default chatController;