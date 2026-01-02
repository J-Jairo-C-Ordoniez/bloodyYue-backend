import db from '../../config/db.js';

export const create = async (data) => {
    try {
        const { userId, type, message } = data;
        const [result] = await db.query(
            'INSERT INTO notifications (userId, type, message, isRead) VALUES (?, ?, ?, false)',
            [userId, type, message]
        );
        return { notificationId: result.insertId, ...data, isRead: false };
    } catch (error) {
        throw error;
    }
};

export const getByUserId = async (userId) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC',
            [userId]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

export const markAsRead = async (notificationId) => {
    try {
        const [result] = await db.query(
            'UPDATE notifications SET isRead = true WHERE notificationId = ?',
            [notificationId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
};

export const markAllAsRead = async (userId) => {
    try {
        const [result] = await db.query(
            'UPDATE notifications SET isRead = true WHERE userId = ?',
            [userId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
};
