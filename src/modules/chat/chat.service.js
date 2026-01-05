import chatRepository from './chat.repository.js';
import notificationService from '../notification/notification.service.js';
import userService from '../user/user.service.js';

const chatService = {
    createChat: async (userId) => {
        const chat = await chatRepository.createChat(userId);
        if (!chat) {
            throw ({ message: 'Not Found Chat', statusCode: 404 });
        }

        return chat;
    },

    getChatsRoom: async (userId) => {
        const chatsRoom = await chatRepository.getChatsRoom(userId);
        if (!chatsRoom) {
            throw ({ message: 'Not Found Chats', statusCode: 404 });
        }

        return chatsRoom;
    },

    getMessages: async (chatId) => {
        const messages = await chatRepository.getMessages(chatId);
        if (!messages) {
            throw ({ message: 'Not Found Messages', statusCode: 404 });
        }

        return messages;
    },

    userBelongsToChat: async (userId, chatId) => {
        return await chatRepository.userBelongsToChat(chatId, userId);
    },

    sendMessage: async (data) => {
        const isParticipant = await chatRepository.userBelongsToChat(data.chatId, data.senderId);
        if (!isParticipant) {
            throw ({ message: 'Not Found Participant', statusCode: 404 });
        }

        const participants = await chatRepository.getChatParticipants(data.chatId);
        const receiverId = participants.find(id => id !== data.senderId);

        const newMessage = await chatRepository.createChatItem({
            chatId: data.chatId,
            userId: data.senderId,
            content: data.content
        });

        if (!newMessage) {
            throw ({ message: 'Post creation failed', statusCode: 500 });
        }

        const user = await userService.getUserById(data.senderId);

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
    }
}

export default chatService;