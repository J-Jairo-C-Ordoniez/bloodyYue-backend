import db from '../../config/db.config.js';

const commissionsRepository = {
    createCommission: async (commission) => {
        try {
            const columns = Object.keys(commission).join(', ');
            const placeholders = Object.keys(commission).map(() => '?').join(', ');
            const values = Object.values(commission);

            const [result] = await db.query(`INSERT INTO commissions (${columns}) VALUES (${placeholders})`, values);
        
            return (result.insertId) ? {commissionId: result.insertId} : null;
        } catch (err) {
            throw ({message: err.message, statusCode: 500});
        }
    },

    addLabels: async (commissionId, labels) => {
        try {
            const values = labels.map(l => [commissionId, l]);
            const [result] = await db.query(
                `INSERT INTO commissionsXlabels (commissionId, labelId) VALUES ?`,
                [values]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    getCommissions: async (id) => {
        try {
            const [result] = await db.query('SELECT commissionId, userId, title, description, terms, content, price FROM commissions WHERE commissionId > ? ORDER BY commissionId ASC LIMIT 10', [id]);
            
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code || 500});
        }
    },

    getCommissionsById: async (id) => {
        try {
            const [result] = await db.query('SELECT commissionId, userId, title, content, exampleId, description, price, terms FROM commissions WHERE commissionId = ?', [id]);
            
            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code || 500});
        }
    },

    getLabelsByCommissionId: async (id) => {
        try {
            const [result] = await db.query(
                `SELECT l.labelId, l.name, l.color 
                 FROM labels l
                 INNER JOIN commissionsXlabels cxl ON l.labelId = cxl.labelId
                 WHERE cxl.commissionId = ?`,
                [id]
            );
            
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code || 500});
        }
    },

    getCommissionsByLabel: async (labelId) => {
        try {
            const [result] = await db.query(
                `SELECT c.commissionId, c.userId, c.title, c.content, c.price 
                 FROM commissions c
                 INNER JOIN commissionsXlabels cxl ON c.commissionId = cxl.commissionId
                 WHERE cxl.labelId = ?`,
                [labelId]
            );
            
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code || 500});
        }
    },

    getCommissionsByTitle: async (title) => {
        try {
            const [result] = await db.query('SELECT commissionId, userId, title, content, price FROM commissions WHERE title LIKE ?', [`%${title}%`]);
            
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code || 500});
        }
    },

    getCommissionsByPrice: async (price) => {
        try {
            const [result] = await db.query('SELECT commissionId, userId, title, content, price FROM commissions WHERE price <= ?', [price]);
            
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code || 500});
        }
    },

    updateCommission: async (id, commission) => {
        try {
            const [result] = await db.query('UPDATE commissions SET ? WHERE commissionId = ?', [commission, id]);
            return (result) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code || 500});
        }
    },

    removeLabels: async (id) => {
        try {
            const result = await db.query('DELETE FROM commissionsXlabels WHERE commissionId = ?', [id]);
            return result.affectedRows > 0;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code || 500});
        }
    }
}

export default commissionsRepository;