import db from '../../config/db.js';

const salesRepository = {
    createSale: async (data) => {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(
                `INSERT INTO sales (${columns}) VALUES (${placeholders})`,
                values
            );
            return (result.insertId) ? { saleId: result.insertId, ...data } : null;
        } catch (error) {
            throw ({ message: error.message, statusCode: error.statusCode });
        }
    },

    getSales: async (id) => {
        try {
            const [result] = await db.query(
                `SELECT saleId, cartItemId, total, paymentMethod, status, createdAt FROM sales WHERE saleId > ?  ORDER BY saleId ASC LIMIT 10`,
                [id]
            );
            return (result.length > 0) ? result : null;
        } catch (error) {
            throw ({ message: error.message, statusCode: error.statusCode });
        }
    },

    getSalesById: async (id) => {
        try {
            const [result] = await db.query(
                `SELECT s.saleId, s.total, s.paymentMethod, s.status, s.createdAt, c.title as commissionTitle, c.content as commissionContent, ci.quantity as commissionQuantity, ci.status as commissionStatus, ci.priceAtMoment as commissionPriceAtMoment, ci.details as commissionDetails
                 FROM sales s
                 INNER JOIN cartItems ci ON s.cartItemId = ci.cartItemId
                 LEFT JOIN commissions c ON ci.commissionId = c.commissionId
                 WHERE s.saleId = ?`,
                [id]
            );

            return (result[0]) ? result[0] : null;
        } catch (error) {
            throw ({ message: error.message, statusCode: error.statusCode });
        }
    },

    getSalesSold: async () => {
        try {
            const [result] = await db.query(
                `SELECT s.saleId, s.total, s.paymentMethod, s.status, s.createdAt, c.title as commissionTitle, c.content as commissionContent, ci.quantity as commissionQuantity, ci.status as commissionStatus, ci.priceAtMoment as commissionPriceAtMoment, ci.details as commissionDetails
                 FROM sales s
                 INNER JOIN cartItems ci ON s.cartItemId = ci.cartItemId
                 LEFT JOIN commissions c ON ci.commissionId = c.commissionId
                 WHERE s.status = 'paid'`,
            );
            return (result.length > 0) ? result : null;
        } catch (error) {
            throw ({ message: error.message, statusCode: error.statusCode });
        }
    },

    getSalesByUserId: async (userId) => {
        try {
            const [result] = await db.query(
                `SELECT s.saleId, s.total, s.paymentMethod, s.status, s.createdAt, c.title as commissionTitle, c.content as commissionContent, ci.quantity as commissionQuantity, ci.status as commissionStatus, ci.priceAtMoment as commissionPriceAtMoment, ci.details as commissionDetails

                 FROM sales s
                 INNER JOIN cartItems ci ON s.cartItemId = ci.cartItemId
                 INNER JOIN cart ca ON ci.cartId = ca.cartId
                 LEFT JOIN commissions c ON ci.commissionId = c.commissionId
                 WHERE ca.userId = ?
                 ORDER BY s.createdAt DESC`,
                [userId]
            );
            return (result.length > 0) ? result : null;
        } catch (error) {
            throw ({ message: error.message, statusCode: error.statusCode });
        }
    },

    getSalesByPeriod: async (period) => {
        try {
            const [result] = await db.query(
                `SELECT s.saleId, s.total, s.paymentMethod, s.status, s.createdAt, c.title as commissionTitle, c.content as commissionContent, ci.quantity as commissionQuantity, ci.status as commissionStatus, ci.priceAtMoment as commissionPriceAtMoment, ci.details as commissionDetails
                 FROM sales s
                 INNER JOIN cartItems ci ON s.cartItemId = ci.cartItemId
                 LEFT JOIN commissions c ON ci.commissionId = c.commissionId
                 WHERE s.createdAt >= DATE_SUB(CURDATE(), INTERVAL 1 ${period})`,
            );

            return (result.length > 0) ? result : null;
        } catch (error) {
            throw ({ message: error.message, statusCode: error.statusCode });
        }
    },

    updateSaleStatus: async (saleId, status) => {
        try {
            const [result] = await db.query(
                `UPDATE sales SET status = ? WHERE saleId = ?`,
                [status, saleId]
            );
            return (result.affectedRows > 0) ? result : null;
        } catch (error) {
            throw ({ message: error.message, statusCode: error.statusCode });
        }
    },

    createDetailsSale: async (data) => {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(
                `INSERT INTO detailsSale (${columns}) VALUES (${placeholders})`,
                values
            );
            return (result.insertId) ? { detailsSaleId: result.insertId, ...data } : null;
        } catch (error) {
            throw ({ message: error.message, statusCode: error.statusCode });
        }
    },
};