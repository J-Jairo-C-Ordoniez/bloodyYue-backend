import chatRepository from './chat.repository.js';
import userRepository from '../users/user.repository.js';
import notificationService from '../notifications/notifications.service.js';

const chatService = {
    createChat: async (userId, participantId) => {
        if ((!userId) || (!participantId)) {
            throw ({ message: 'Missing parameters', statusCode: 400 });
        }
        const existChat = await chatRepository.getChatByParticipants(userId, participantId);
        if (existChat) {
           return { chatId: existChat.chatId }
        }

        const chat = await chatRepository.createChat();
        if (!chat) {
            throw ({ message: 'Chat creation failed', statusCode: 500 });
        }

        const addParticipants = await chatRepository.addParticipants(chat, [userId, participantId]);
        if (!addParticipants) {
            throw ({ message: 'Participants addition failed', statusCode: 500 });
        }

        return {chatId: chat.chatId}
    },

    changeStatusChat: async (chatId, status) => {
        if ((!chatId) || (!status)) {
            throw ({ message: 'Missing parameters', statusCode: 400 });
        }

        const chat = await chatRepository.changeStatusChat(chatId, status);
        if (!chat) {
            throw ({ message: 'Chat not found', statusCode: 404 });
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

    userBelongsToChat: async (chatId, userId) => {
        return await chatRepository.userBelongsToChat(chatId, userId);
    },

    sendMessage: async (data) => {
        const isParticipant = await chatRepository.userBelongsToChat(data.chatId, data.senderId);
        if (!isParticipant) {
            throw ({ message: 'Not Found Participant', statusCode: 404 });
        }

        const participants = await chatRepository.getParticipants(data.chatId);
        const receiverId = participants.find(id => id.userId !== data.senderId);


        const newMessage = await chatRepository.createMessage({
            chatId: data.chatId,
            senderId: data.senderId,
            content: data.content
        });


        if (!newMessage) {
            throw ({ message: 'Post creation failed', statusCode: 500 });
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
        if (!chatId || !status) {
            throw ({ message: 'Input invalid data', statusCode: 400 });
        }

        const newStatusChat = await chatRepository.changeStatusChat(chatId, status);
        if (!newStatusChat) {
            throw ({ message: 'Not Found Chat', statusCode: 404 });
        }

        return newStatusChat;
    }
}

export default chatService;