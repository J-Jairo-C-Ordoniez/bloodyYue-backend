import { pool } from '../../config/database.js';

export const getSettings = async () => {
    return { theme: 'dark', language: 'en' };
};

export const updateSettings = async (data) => {
    // await pool.query('UPDATE settings SET ?', [data]);
    return data;
};
