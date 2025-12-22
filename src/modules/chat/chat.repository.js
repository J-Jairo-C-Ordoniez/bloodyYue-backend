import db from '../../config/db.js';

export const create = async (data) => {
    // await pool.query('INSERT INTO messages SET ?', [data]);
    return { id: 1, ...data };
};

export const getByConversationId = async (conversationId) => {
    // await pool.query('SELECT * FROM messages WHERE conversation_id = ?', [conversationId]);
    return [];
};
