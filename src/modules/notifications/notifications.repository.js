import db from '../../config/db.js';

export const create = async (data) => {
    // await pool.query('INSERT INTO notifications SET ?', [data]);
    return { id: 1, ...data };
};

export const getByUserId = async (userId) => {
    // await pool.query('SELECT * FROM notifications WHERE user_id = ?', [userId]);
    return [];
};
