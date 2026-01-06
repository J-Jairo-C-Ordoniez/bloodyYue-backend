import db from '../../config/db.config.js';

const userRepository = {
    getUserById: async (id) => {
        try {
            const [result] = await db.query(
                'SELECT userId, name, birthday, avatar, poster, isActive, isVerified, status FROM users WHERE userId = ?', [id]);

            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },

    updateMyProfile: async (id, data) => {
        try {
            const [result] = await db.query(
                'UPDATE users SET ? WHERE userId = ?', [data, id]);

            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },

    getTestimonyByUserId: async (id) => {
        try {
            const [result] = await db.query(
                'SELECT testimonyId, userId, message, createdAt FROM testimonies WHERE userId = ?', [id]);

            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },

    getTestimonyById: async (id) => {
        try {
            const [result] = await db.query(
                'SELECT testimonyId, userId, message, createdAt FROM testimonies WHERE testimonyId = ?', [id]);

            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },

    getUsersPermitNotification: async (permit) => {
        try {
            const [result] = await db.query(
                `SELECT u.userId, u.name 
                FROM users u
                INNER JOIN roles r ON u.rolId = r.rolId
                INNER JOIN rolXpermits rxp ON r.rolId = rxp.rolId
                INNER JOIN permits p ON rxp.permitId = p.permitId
                WHERE p.name = ?`, [permit]);

            return result;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },

    getUserSaleDetails: async (id) => {
        try {
            const [result] = await db.query(
                `SELECT u.userId, u.name 
                FROM users u
                INNER JOIN carts c ON u.userId = c.userId
                INNER JOIN cartItems ci ON c.cartId = ci.cartId
                INNER JOIN sales s ON ci.cartItemId = s.cartItemId
                INNER JOIN detailsSale ds ON s.saleId = ds.saleId
                WHERE ds.detailsSaleId = ?`, [id]);

            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },

    createTestimony: async (id, message) => {
        try {
            const [result] = await db.query(
                'INSERT INTO testimonies (userId, message) VALUES (?, ?)', [id, message]);

            return (result.insertId) ? { testimonyId: result.insertId, message, userId: id } : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },

    updateTestimony: async (id, message) => {
        try {
            const [result] = await db.query(
                'UPDATE testimonies SET message = ? WHERE userId = ?', [message, id]);

            return (result.affectedRows > 0) ? { testimonyId: result.insertId, message, userId: id } : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },

    deleteTestimony: async (id) => {
        try {
            const [result] = await db.query(
                'DELETE FROM testimonies WHERE testimonyId = ?', [id]);

            return (result.affectedRows > 0) ? { testimonyId: id } : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },

    getTestimonies: async () => {
        try {
            const [result] = await db.query(
                'SELECT testimonyId, userId, message, createdAt FROM testimonies');

            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: 500 })
        }
    },
};

export default userRepository;