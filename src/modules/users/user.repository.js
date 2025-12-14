import { pool } from '../../config/database.js';

export const getAll = async () => {
    // const [rows] = await pool.query('SELECT * FROM users');
    return [];
};

export const getById = async (id) => {
    // const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return { id, name: "User Placeholder" };
};
