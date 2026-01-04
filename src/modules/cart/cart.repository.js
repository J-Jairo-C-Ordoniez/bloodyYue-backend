import db from '../../config/db.config.js';

const cartRepository = {
    addItem: async (data) => {
        try {
            const columns = Object.keys(data);
            const placeholders = columns.map(() => '?').join(', ');
            const values = Object.values(data);
            const [result] = await db.query(
                `INSERT INTO cartItems (${columns.join(', ')}) 
                 VALUES (${placeholders})`,
                values
            );
            return (result.insertId) ? {cartItemId: result.insertId, ...data} : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.statusCode});
        }
    },

    getCartByUserId: async (userId) => {
        try {
            const [result] = await db.query(
                `SELECT cartId FROM cartItems WHERE userId = ?`,
                [userId]
            );
            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.statusCode});
        }
    },

    getItems: async (cartId) => {
        try {
            const [result] = await db.query(
                `SELECT cartItemId, commissionId, quantity, status, priceAtMoment FROM cartItems WHERE cartId = ?`,
                [cartId]
            );
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.statusCode});
        }
    },

    getCartItemById: async (cartItemId) => {
        try {
            const [result] = await db.query(
                `SELECT ci.cartItemId, ci.commissionId, ci.quantity, ci.status, ci.priceAtMoment, ci.details, c.title, c.content, c.description, c.terms 
                FROM cartItems ci
                INNER JOIN commissions c ON ci.commissionId = c.commissionId
                WHERE ci.cartItemId = ?`,
                [cartItemId]
            );
            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.statusCode});
        }
    },

    updateItem: async (cartItemId, data) => {
        try {
            const [result] = await db.query(
                `UPDATE cartItems SET ? WHERE cartItemId = ?`,
                [data, cartItemId]
            );
            return (result.affectedRows > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.statusCode});
        }
    },

    changeItemStatus: async (cartItemId, status) => {
        try {
            const [result] = await db.query(
                `UPDATE cartItems SET status = ? WHERE cartItemId = ?`,
                [status, cartItemId]
            );
            return (result.affectedRows > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.statusCode});
        }
    }
}

export default cartRepository;