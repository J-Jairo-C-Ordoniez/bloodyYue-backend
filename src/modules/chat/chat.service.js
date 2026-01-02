import * as chatRepository from './chat.repository.js';

export const sendMessage = async (data) => {
    const { userId, message } = data;
    let chat = await chatRepository.getChatByUserId(userId);
    if (!chat) {
        chat = await chatRepository.createChat(userId);
    }
    return await chatRepository.addMessage(chat.chatId, userId, message);
};

export const getMessages = async (userId) => {
    const chat = await chatRepository.getChatByUserId(userId);
    if (!chat) {
        return [];
    }
    return await chatRepository.getMessages(chat.chatId);
};

export const markAsRead = async (userId) => {
    const chat = await chatRepository.getChatByUserId(userId);
    if (!chat) return false;
    return await chatRepository.markMessagesAsRead(chat.chatId, userId);
};
