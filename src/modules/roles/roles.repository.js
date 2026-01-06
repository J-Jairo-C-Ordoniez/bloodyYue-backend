import db from '../../config/db.config.js';

const rolesRepository = {
    createRole: async (roleData) => {
        try {
            const columns = Object.keys(roleData).join(', ');
            const placeholders = Object.values(roleData).map(() => '?').join(', ');
            const values = Object.values(roleData);

            const [result] = await db.query(
                `INSERT INTO roles (${columns}) VALUES (${placeholders})`,
                values
            );

            return (result.insertId) ? { rolId: result.insertId, ...roleData } : null;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },

    getAllRoles: async () => {
        try {
            const [result] = await db.query('SELECT rolId, name, description FROM roles');
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },

    getRoleById: async (rolId) => {
        try {
            const [result] = await db.query(`
                SELECT rolId, name, description
                FROM roles 
                WHERE rolId = ?;`, 
            [rolId]);

            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },

    getPermitsByRole: async (rolId) => {
        try {
            const [result] = await db.query(
                `SELECT p.permitId, p.name, p.description, rxp.rolId
                 FROM permits p 
                 INNER JOIN rolXpermits rxp ON p.permitId = rxp.permitId 
                 WHERE rxp.rolId = ?`,
                [rolId]
            );
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },

    getAllPermits: async () => {
        try {
            const [result] = await db.query('SELECT permitId, name, description FROM permits');
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },

    assignPermitToRole: async (rolId, permitsId) => {
        try {
            const values = permitsId.map(permitId => [rolId, permitId]);
            const [result] = await db.query(
                'INSERT INTO rolXpermits (rolId, permitId) VALUES ?',
                [values]
            );
            return (result.insertId) ? result : null;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    },

    removePermitFromRole: async (rolId, permitId) => {
        try {
            const [result] = await db.query(
                'DELETE FROM rolXpermits WHERE rolId = ? AND permitId = ?',
                [rolId, permitId]
            );
            return (result.affectedRows > 0) ? { rolId, permitId } : null;
        } catch (err) {
            throw {message: err.message, statusCode: err.statusCode};
        }
    }
};

export default rolesRepository;
