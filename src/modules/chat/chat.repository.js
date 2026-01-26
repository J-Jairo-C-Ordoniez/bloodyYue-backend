import db from '../../config/db.config.js';

const chatRepository = {
    createChat: async () => {
        try {
            const [result] = await db.query(
                `INSERT INTO chats ()
                VALUES ();`
            );

            return (result.insertId) ? result.insertId : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    createMessage: async (data) => {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(
                `INSERT INTO messages (${columns})
                VALUES (${placeholders});`,
                values
            );

            return (result.insertId) ? result.insertId : null;
        } catch (err) {

            throw ({ message: err.message, statusCode: 500 });
        }
    },

    addParticipants: async (chatId, participants) => {
        try {
            const values = participants.map(participant => [chatId, participant]);
            const [result] = await db.query(
                `INSERT INTO chatParticipants (chatId, userId)
                VALUES ?;`,
                [values]
            );

            return (result.insertId) ? result.insertId : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    getChatByParticipants: async (participantOneId, participantTwoId) => {
        try {
            const [result] = await db.query(
                `SELECT
                    c.chatId
                    FROM chats c
                    JOIN chatParticipants cp1 ON c.chatId = cp1.chatId
                    JOIN chatParticipants cp2 ON c.chatId = cp2.chatId
                    WHERE cp1.userId = ?
                    AND cp2.userId = ?;`,
                [participantOneId, participantTwoId]
            );

            return (result.length > 0) ? result.rows[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    getParticipants: async (chatId) => {
        try {
            const [result] = await db.query(
                `SELECT
                    cp.userId
                FROM chatParticipants cp
                WHERE cp.chatId = ?;`,
                [chatId]
            );

            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    getChatsRoom: async (userId) => {
        try {

            const [result] = await db.query(
                `SELECT
                    c.chatId,
                    u.userId,
                    u.name,
                    u.avatar
                FROM chats c
                INNER JOIN chatParticipants cp1 ON c.chatId = cp1.chatId
                INNER JOIN chatParticipants cp2 ON c.chatId = cp2.chatId
                INNER JOIN users u ON u.userId = cp2.userId
                WHERE cp1.userId = ?
                AND cp2.userId != ?;`,
                [userId, userId]
            );

            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: 404 });
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

            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
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

    changeStatusChat: async (chatId, status) => {
        try {
            const [result] = await db.query(
                `UPDATE chats
                SET isActive = ?
                WHERE chatId = ?;`,
                [status, chatId]
            );

            return (result.affectedRows > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.status });
        }
    }
}

export default chatRepository;