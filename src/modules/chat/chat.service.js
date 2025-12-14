import * as chatRepository from './chat.repository.js';

export const sendMessage = async (data) => {
    return chatRepository.create(data);
};

export const getMessages = async (conversationId) => {
    return chatRepository.getByConversationId(conversationId);
};
