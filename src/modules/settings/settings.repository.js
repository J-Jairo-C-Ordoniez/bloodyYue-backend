import db from '../../config/db.js';

const settingsRepository = {
    createSettings: async (data) => {
        try {
            const colums = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(
                `INSERT INTO settings (${colums}) VALUES (${placeholders})`,
                values
            );
            
            return (result.insertId) ? { settingId: result.insertId, ...data } : null;
        } catch (error) {
            throw ({message: error.message, statusCode: error.code});
        }
    },
    
    getSettings: async (id) => {
        try {
            const [result] = await db.query('SELECT * FROM settings WHERE settingId = ?', [id]);
            return (result[0]) ? result[0] : null;
        } catch (error) {
            throw ({message: error.message, statusCode: error.code});
        }
    },
    
    updateSettings: async (id, data) => {
        try {
            const [result] = await db.query('UPDATE settings SET ? WHERE settingId = ?', [id, data]);
            return (result.affectedRows > 0) ? result : null;
        } catch (error) {
            throw ({message: error.message, statusCode: error.code});
        }
    },
};

export default settingsRepository;