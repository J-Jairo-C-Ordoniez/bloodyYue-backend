import db from '../../config/db.config.js';

const notificationsRepository = {
    create: async (data) => {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);
            
            const [result] = await db.query(
                `INSERT INTO notifications (${columns}) VALUES (${placeholders})`,
                values
            );
            return { notificationId: result.insertId, ...data, isRead: false };
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },
    
    getByUserId: async (userId) => {
        try {
            const [result] = await db.query(
                'SELECT notificationId, userId, type, message, isRead, createdAt FROM notifications WHERE userId = ? AND isRead = false ORDER BY createdAt DESC',
                [userId]
            );

            return (result.length > 0) ? result : null;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },

    getById: async (notificationId) => {
        try {
            const [result] = await db.query(
                'SELECT notificationId, userId, type, message, isRead, createdAt FROM notifications WHERE notificationId = ? AND isRead = false',
                [notificationId]
            );
            return (result.length > 0) ? result[0] : null;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },

    markAsRead: async (notificationId) => {
        try {
            const [result] = await db.query(
                'UPDATE notifications SET isRead = true WHERE notificationId = ?',
                [notificationId]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },
    
    markAllAsRead: async (userId) => {
        try {
            const [result] = await db.query(
                'UPDATE notifications SET isRead = true WHERE userId = ?',
                [userId]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },
};

export default notificationsRepository;