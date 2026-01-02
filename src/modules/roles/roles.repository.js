import db from '../../config/db.js';

const rolesRepository = {
    getAllRoles: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM roles');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getRoleById: async (rolId) => {
        try {
            const [rows] = await db.query('SELECT * FROM roles WHERE rolId = ?', [rolId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    createRole: async (roleData) => {
        try {
            const { name, description } = roleData;
            const [result] = await db.query(
                'INSERT INTO roles (name, description) VALUES (?, ?)',
                [name, description]
            );
            return { rolId: result.insertId, ...roleData };
        } catch (error) {
            throw error;
        }
    },

    updateRole: async (rolId, roleData) => {
        try {
            const { name, description } = roleData;
            const [result] = await db.query(
                'UPDATE roles SET name = ?, description = ? WHERE rolId = ?',
                [name, description, rolId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    deleteRole: async (rolId) => {
        try {
            const [result] = await db.query('DELETE FROM roles WHERE rolId = ?', [rolId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    // Permits
    getAllPermits: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM permits');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    createPermit: async (permitData) => {
        try {
            const { titleBack, name, description } = permitData;
            const [result] = await db.query(
                'INSERT INTO permits (titleBack, name, description) VALUES (?, ?, ?)',
                [titleBack, name, description]
            );
            return { permitId: result.insertId, ...permitData };
        } catch (error) {
            throw error;
        }
    },

    getPermitsByRoleId: async (rolId) => {
        try {
            const [rows] = await db.query(
                `SELECT p.* 
                 FROM permits p 
                 INNER JOIN rolXpermits rxp ON p.permitId = rxp.permitId 
                 WHERE rxp.rolId = ?`,
                [rolId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    },

    assignPermitToRole: async (rolId, permitId) => {
        try {
            const [result] = await db.query(
                'INSERT INTO rolXpermits (rolId, permitId) VALUES (?, ?)',
                [rolId, permitId]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    removePermitFromRole: async (rolId, permitId) => {
        try {
            const [result] = await db.query(
                'DELETE FROM rolXpermits WHERE rolId = ? AND permitId = ?',
                [rolId, permitId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
};

export default rolesRepository;
