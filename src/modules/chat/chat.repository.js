import db from '../../config/db.config.js';

const chatRepository = {
    getChatsRoom: async (userId) => {
        try {
            const [result] = await db.query(
                `SELECT
                c.chatId,
                u.userId,
                u.username,
                u.avatarUrl
            FROM chats c
            JOIN chatParticipants cp1 ON c.chatId = cp1.chatId
            JOIN chatParticipants cp2 ON c.chatId = cp2.chatId
            JOIN users u ON u.userId = cp2.userId
            WHERE cp1.userId = ?
            AND cp2.userId != ?;`,
                [userId, userId]
            );

            return (result.length > 0) ? result.rows : null;
        } catch (err) {
            throw ({ message: 'No se encontraron chats', statusCode: 404 });
        }
    },

    getMessages: async (chatId) => {
        try {
            const [result] = await db.query(
                `SELECT
                    m.messageId,
                    m.content,
                    m.senderId,
                    m.createdAt
                FROM messages m
                WHERE m.chatId = ?
                ORDER BY m.createdAt ASC;`,
                [chatId]
            );

            return (result.length > 0) ? result.rows : null;
        } catch (err) {
            throw ({ message: 'No se encontraron mensajes', statusCode: 404 });
        }
    },

    userBelongsToChat: async (chatId, userId) => {
        try {
            const [result] = await db.query(
                `SELECT 1
                FROM chatParticipants
                WHERE chatId = ?
                AND userId = ?;`,
                [chatId, userId]
            );

            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.status });
        }
    },
}

export default chatRepository;