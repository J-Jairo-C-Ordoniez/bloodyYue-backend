import db from '../../config/db.js';

export const getChatByUserId = async (userId) => {
    try {
        const [rows] = await db.query('SELECT * FROM chats WHERE userId = ?', [userId]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

export const createChat = async (userId) => {
    try {
        const [result] = await db.query('INSERT INTO chats (userId, isActive) VALUES (?, true)', [userId]);
        return { chatId: result.insertId, userId, isActive: true };
    } catch (error) {
        throw error;
    }
};

export const addMessage = async (chatId, userId, message) => {
    try {
        const [result] = await db.query(
            'INSERT INTO chatItems (chatId, userId, message, isRead) VALUES (?, ?, ?, ?)',
            [chatId, userId, message, 'false']
        );
        return { chatItemId: result.insertId, chatId, userId, message, isRead: 'false' };
    } catch (error) {
        throw error;
    }
};

export const getMessages = async (chatId) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM chatItems WHERE chatId = ? ORDER BY createdAt ASC',
            [chatId]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

export const markMessagesAsRead = async (chatId, userId) => {
    try {
        // Mark messages SENT BY userId as read? Or messages sent TO userId?
        // Usually, if I request 'mark as read', I am reading messages sent by the OTHER party.
        // But here we might just have a simple administrative chat. 
        // Let's assume we mark all messages in the chat as read for now, or maybe specific ones.
        // Given the schema `isRead VARCHAR(255)`, let's simple update all for the chat that are not the current user's (if we knew who calls).
        // Since we don't have complex auth context here yet, let's just mark all as read.
        const [result] = await db.query(
            "UPDATE chatItems SET isRead = 'true' WHERE chatId = ? AND userId != ?",
            [chatId, userId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
};
