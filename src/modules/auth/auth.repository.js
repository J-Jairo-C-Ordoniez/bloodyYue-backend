import db from '../../config/db.js';

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
            throw new AppError(err.message, err.code);
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
           throw new AppError(err.message, err.code) 
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
           throw new AppError(err.message, err.code) 
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
            throw new AppError(err.message, err.code);
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

            return (result.insertId) ? { id: result.insertId, ...data } : null;
        } catch (err) {
            throw new AppError(err.message, err.code);
        }
    },

    async revokedRefreshToken(data) {
        try {
            const [result] = await db.query(
                'UPDATE refreshTokens SET isRevoked = 1 WHERE refreshToken = ?',
                [data]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw new AppError(err.message, err.code);
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

            return (result.insertId) ? { id: result.insertId, ...data } : null;
        } catch (err) {
            throw new AppError(err.message, err.code);
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
            throw new AppError(err.message, err.code);
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
           throw new AppError(err.message, err.code) 
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
            throw new AppError(err.message, err.code);
        }
    }
}

export default authRepository;