import chatRepository from './chat.repository.js';
import userRepository from '../users/user.repository.js';
import notificationService from '../notifications/notifications.service.js';
import AppError from '../../utils/errors/AppError.js';

const chatService = {
    createChat: async (userId, participantId) => {
        if ((!userId) || (!participantId)) {
            throw new AppError('Missing parameters', 400);
        }
        const existChat = await chatRepository.getChatByParticipants(userId, participantId);
        if (existChat) {
            return { chatId: existChat.chatId }
        }

        const chat = await chatRepository.createChat();
        if (!chat) {
            throw new AppError('Chat creation failed', 500);
        }

        const addParticipants = await chatRepository.addParticipants(chat, [userId, participantId]);
        if (!addParticipants) {
            throw new AppError('Participants addition failed', 500);
        }

        return { chatId: chat.chatId }
    },

    getChatsRoom: async (userId) => {
        const chatsRoom = await chatRepository.getChatsRoom(userId);
        if (!chatsRoom) {
            throw new AppError('Not Found Chats', 404);
        }

        return chatsRoom;
    },

    getMessages: async (chatId) => {
        const messages = await chatRepository.getMessages(chatId);
        if (!messages) {
            throw new AppError('Not Found Messages', 404);
        }

        return messages;
    },

    userBelongsToChat: async (chatId, userId) => {
        return await chatRepository.userBelongsToChat(chatId, userId);
    },

    sendMessage: async (data) => {
        const isParticipant = await chatRepository.userBelongsToChat(data.chatId, data.senderId);
        if (!isParticipant) {
            throw new AppError('Not Found Participant', 404);
        }

        const participants = await chatRepository.getParticipants(data.chatId);
        const receiverId = participants.find(id => id.userId !== data.senderId);


        const newMessage = await chatRepository.createMessage({
            chatId: data.chatId,
            senderId: data.senderId,
            content: data.content
        });


        if (!newMessage) {
            throw new AppError('Post creation failed', 500);
        }


        const user = await userRepository.getUserById(data.senderId);

        await notificationService.createNotification({
            userId: user.userId,
            userIdNotify: receiverId,
            type: "message",
            message: `${user.name} ha enviado un mensaje`,
            body: data.content
        });

        return {
            ...newMessage,
            receiverId
        };
    },

    changeStatusChat: async (chatId, status) => {
        if (!chatId || status === undefined) {
            throw new AppError('Input invalid data', 400);
        }

        const newStatusChat = await chatRepository.changeStatusChat(chatId, status);
        if (!newStatusChat) {
            throw new AppError('Not Found Chat', 404);
        }

        return newStatusChat;
    }
}

export default chatService;