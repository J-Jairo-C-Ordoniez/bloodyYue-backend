import db from '../../config/db.config.js';

const notificationsRepository = {
    create: async (data) => {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = columns.map(() => '?').join(', ');
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
            const [rows] = await db.query(
                'SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC',
                [userId]
            );
            return rows;
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
        } catch (error) {
            throw error;
        }
    },
    markAllAsRead: async (userId) => {
        try {
            const [result] = await db.query(
                'UPDATE notifications SET isRead = true WHERE userId = ?',
                [userId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },
};

export default notificationsRepository;