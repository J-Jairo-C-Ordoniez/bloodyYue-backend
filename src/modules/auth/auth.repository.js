import db from '../../config/db.config.js';

const authRepository = {
    async createUser(data) {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(
                `INSERT INTO users (${columns}) VALUES (${placeholders})`,
                values
            );
            return (result.insertId) ? { id: result.insertId, ...data } : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async createCart(data) {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(
                `INSERT INTO carts (${columns}) VALUES (${placeholders})`,
                values
            );
            return (result.insertId) ? { id: result.insertId, ...data } : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async getByEmail(email) {
        try {
            const [result] = await db.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async getByUserId(userId) {
        try {
            const [result] = await db.query(
                'SELECT * FROM users WHERE userId = ?',
                [userId]
            );
            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async isActiveUser(userId, isActive) {
        try {
            const [result] = await db.query(
                'UPDATE users SET isActive = ? WHERE userId = ?',
                [isActive, userId]
            );

            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async createRefreshToken(data) {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(
                `INSERT INTO refreshTokens (${columns}, expiresAt) VALUES (${placeholders}, DATE_ADD(NOW(), INTERVAL 1 WEEK))`,
                values
            );

            return (result.insertId) ? { refreshTokenId: result.insertId } : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async revokedRefreshToken(data) {
        try {
            const [result] = await db.query(
                'UPDATE refreshTokens SET isRevoked = 1 WHERE token = ?',
                [data]
            );

            return result.affectedRows > 0;
        } catch (err) {
            console.log(err);
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async createVerificationCode(data) {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(
                `INSERT INTO codes (${columns}, deadline) VALUES (${placeholders}, DATE_ADD(NOW(), INTERVAL 1 HOUR))`,
                values
            );

            return (result.insertId) ? result.insertId : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async getCodeByUserId(userId) {
        try {
            const [result] = await db.query(
                'SELECT * FROM codes WHERE userId = ? ORDER BY deadline DESC LIMIT 1',
                [userId]
            );
            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async updateVerification(data) {
        try {
            const [result] = await db.query(
                'UPDATE users SET isVerified = ? WHERE userId = ?',
                [data.isVerified, data.userId]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async updatePassword(data) {
        try {
            const [result] = await db.query(
                'UPDATE users SET password = ? WHERE userId = ?',
                [data.password, data.userId]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async getRolById(rolId) {
        try {
            const [result] = await db.query(
                'SELECT * FROM roles WHERE rolId = ?',
                [rolId]
            );
            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async updateRol(data) {
        try {
            const [result] = await db.query(
                'UPDATE users SET rolId = ? WHERE userId = ?',
                [data.rolId, data.userId]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async getRefreshToken(data) {
        try {
            const [result] = await db.query(
                'SELECT * FROM refreshTokens WHERE userId = ? ORDER BY createdAt DESC LIMIT 1',
                [data]
            );

            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    async roleHasPermission(rolId, permissionTitleBack) {
        try {
            const [result] = await db.query(`
                SELECT 1
                FROM roles r
                INNER JOIN rolXpermits rp ON r.rolId = rp.rolId
                INNER JOIN permits p ON rp.permitId = p.permitId
                WHERE r.rolId = ? AND p.titleBack = ?
                LIMIT 1
            `, [rolId, permissionTitleBack]);

            return result.length > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code });
        }
    },

    changeStatus: async (id, status) => {
        try {
            const [result] = await db.query(
                'UPDATE users SET status = ? WHERE userId = ?', [status, id]);

            return result.affectedRows > 0;
        } catch (err) {
            throw new AppError(err.message, err.code)
        }
    },
}

export default authRepository;