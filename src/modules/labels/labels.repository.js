import db from '../../config/db.config.js';

const labelsRepository = {
    createLabel: async (data) => {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(`INSERT INTO labels (${columns}) VALUES (${placeholders})`, values);

            return (result.insertId) ? { labelId: result.insertId, ...data } : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code});
        }
    },

    getLabels: async () => {
        try {
            const [result] = await db.query('SELECT labelId, name, color FROM labels');
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code});
        }
    },

    getLabelById: async (id) => {
        try {
            const [result] = await db.query('SELECT labelId, name, color FROM labels WHERE labelId = ?', [id]);
            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code});
        }
    },
    
    updateLabel: async (id, data) => {
        try {
            const [result] = await db.query('UPDATE labels SET ? WHERE labelId = ?', [data, id]);
            return (result.affectedRows > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code});
        }
    },
    
    deleteLabel: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM labels WHERE labelId = ?', [id]);
            return (result.affectedRows > 0) ? result : null;
        } catch (err) {
            throw ({message: err.message, statusCode: err.code});
        }
    }
}

export default labelsRepository;