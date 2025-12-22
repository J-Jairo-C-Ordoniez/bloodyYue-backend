import db from '../../config/db.js';

export const addItem = async (data) => {
    // await pool.query('INSERT INTO cart_items SET ?', [data]);
    return { id: 1, ...data };
};

export const getItems = async (userId) => {
    // await pool.query('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
    return [];
};
