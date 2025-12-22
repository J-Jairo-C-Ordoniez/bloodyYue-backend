import db from '../../config/db.js';

export const create = async (data) => {
    // await pool.query('INSERT INTO sales SET ?', [data]);
    return { id: 1, ...data };
};

export const getAll = async () => {
    return [];
};
