import db from '../../config/db.js';

const settingsRepository = {
    createSettings: async (data) => {
        try {
            const colums = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [settings] = await db.query(
                `INSERT INTO settings (${colums}) VALUES (${placeholders})`,
                values
            );
            
            return (settings.insertId) ? { settingId: settings.insertId, ...data } : null;
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
            const [settings] = await db.query('UPDATE settings SET ? WHERE settingId = ?', [id, data]);
            return (settings.affectedRows > 0) ? settings : null;
        } catch (error) {
            throw ({message: error.message, statusCode: error.code});
        }
    },
};

export default settingsRepository;