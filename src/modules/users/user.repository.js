import db from '../../config/db.js';

const userRepository = {
    getUserById: async (id) => {
        try {
            const [result] = await db.query(
                'SELECT userId, name, birthday, avatar, poster, isActive, isVerified, status FROM users WHERE userId = ?', [id]);

            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw new AppError(err.message, err.code)
        }
    },

    updateMyProfile: async (id, data) => {
        try {
            const [result] = await db.query(
                'UPDATE users SET ? WHERE userId = ?', [data, id]);

            return result.affectedRows > 0;
        } catch (err) {
            throw new AppError(err.message, err.code)
        }
    },

    getTestimonyByUserId: async (id) => {
        try {
            const [result] = await db.query(
                'SELECT testimonyId, userId, message, createdAt FROM testimonies WHERE userId = ?', [id]);

            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw new AppError(err.message, err.code)
        }
    },

    getTestimonyById: async (id) => {
        try {
            const [result] = await db.query(
                'SELECT testimonyId, userId, message, createdAt FROM testimonies WHERE testimonyId = ?', [id]);

            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw new AppError(err.message, err.code)
        }
    },

    createTestimony: async (id, message) => {
        try {
            const [result] = await db.query(
                'INSERT INTO testimonies (userId, message) VALUES (?, ?)', [id, message]);

            return (result.insertId) ? { testimonyId: result.insertId, message, userId: id } : null;
        } catch (err) {
            throw new AppError(err.message, err.code)
        }
    },

    updateTestimony: async (id, message) => {
        try {
            const [result] = await db.query(
                'UPDATE testimonies SET message = ? WHERE userId = ?', [message, id]);

            return (result.affectedRows > 0) ? { testimonyId: result.insertId, message, userId: id } : null;
        } catch (err) {
            throw new AppError(err.message, err.code)
        }
    },

    deleteTestimony: async (id) => {
        try {
            const [result] = await db.query(
                'DELETE FROM testimonies WHERE testimonyId = ?', [id]);

            return (result.affectedRows > 0) ? { testimonyId: id } : null;
        } catch (err) {
            throw new AppError(err.message, err.code)
        }
    },

    getTestimonies: async () => {
        try {
            const [result] = await db.query(
                'SELECT testimonyId, userId, message, createdAt FROM testimonies');

            return (result.length > 0) ? result : null;
        } catch (err) {
            throw new AppError(err.message, err.code)
        }
    },
};

export default userRepository;