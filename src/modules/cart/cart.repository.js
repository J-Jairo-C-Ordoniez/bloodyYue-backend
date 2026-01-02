import db from '../../config/db.js';

export const getCartByUserId = async (userId) => {
    try {
        const [rows] = await db.query('SELECT * FROM cart WHERE userId = ?', [userId]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

export const createCart = async (userId) => {
    try {
        const [result] = await db.query('INSERT INTO cart (userId) VALUES (?)', [userId]);
        return { cartId: result.insertId, userId };
    } catch (error) {
        throw error;
    }
};

export const addItem = async (cartId, data) => {
    try {
        const { commissionId, quantity, priceAtMoment, details } = data;
        // Check if item already exists in cart ?? typically yes, but for now simple insert or optional update
        // We will assume unique items per commission for simplicity or multiple entries. 
        // Let's do simple insert.
        const [result] = await db.query(
            `INSERT INTO cartItems (cartId, commissionId, quantity, status, priceAtMoment, details) 
             VALUES (?, ?, ?, 'selected', ?, ?)`,
            [cartId, commissionId, quantity, priceAtMoment, details]
        );
        return { cartItemId: result.insertId, cartId, ...data };
    } catch (error) {
        throw error;
    }
};

export const getItems = async (cartId) => {
    try {
        const [rows] = await db.query(
            `SELECT ci.*, c.title as commissionTitle, c.price as commissionPrice 
             FROM cartItems ci 
             LEFT JOIN commissions c ON ci.commissionId = c.commissionId 
             WHERE ci.cartId = ?`,
            [cartId]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

export const removeItem = async (cartItemId) => {
    try {
        const [result] = await db.query('DELETE FROM cartItems WHERE cartItemId = ?', [cartItemId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
};

export const updateItem = async (cartItemId, data) => {
    try {
        // Build dynamic query or specific fields. quantity is most common.
        const { quantity, status, details } = data;
        // Simple implementation for now
        const [result] = await db.query(
            'UPDATE cartItems SET quantity = COALESCE(?, quantity), status = COALESCE(?, status), details = COALESCE(?, details) WHERE cartItemId = ?',
            [quantity, status, details, cartItemId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
};
