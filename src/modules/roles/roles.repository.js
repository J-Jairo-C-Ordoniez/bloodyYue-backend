import db from '../../config/db.js';

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
                SELECT r.rolId, r.name, r.description p.permitId, p.name, p.description
                FROM roles r 
                INNER JOIN rolXpermits rxp ON r.rolId = rxp.rolId 
                INNER JOIN permits p ON rxp.permitId = p.permitId 
                WHERE r.rolId = ?`, 
            [rolId]);

            return (result.length > 0) ? result[0] : null;
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

    getPermitsByRoleId: async (rolId) => {
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

    assignPermitToRole: async (rolId, permitId) => {
        try {
            const [result] = await db.query(
                'INSERT INTO rolXpermits (rolId, permitId) VALUES (?, ?)',
                [rolId, permitId]
            );
            return (result.insertId) ? { rolId, permitId } : null;
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
