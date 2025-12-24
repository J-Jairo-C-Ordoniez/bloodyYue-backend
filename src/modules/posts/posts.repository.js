import db from '../../config/db.js';

const postsRepository = {
    async createPost(data) {
        try {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const [result] = await db.query(
                `INSERT INTO posts (${columns}) VALUES (${placeholders})`,
                values
            );
            return (result.insertId) ? { postId: result.insertId, ...data } : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async addLabels(postId, labels) {
        try {
            const values = labels.map(l => [postId, l.labelId]);
            const [result] = await db.query(
                `INSERT INTO labelsXposts (postId, labelId) VALUES ?`,
                [values]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async getPosts(id) {
        try {
            const [result] = await db.query(
                'SELECT * FROM posts WHERE postId > ? ORDER BY postId ASC LIMIT 10',
                [id]
            );
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async getPostById(postId) {
        try {
            const [result] = await db.query(
                'SELECT * FROM posts WHERE postId = ?',
                [postId]
            );
            return (result[0]) ? result[0] : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async getLabelsByPostId(postId) {
        try {
            const [result] = await db.query(
                `SELECT l.* 
                 FROM labels l
                 INNER JOIN labelsXposts lx ON l.labelId = lx.labelId
                 WHERE lx.postId = ?`,
                [postId]
            );
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async getPostsByLabel(labelId) {
        try {
            const [result] = await db.query(
                `SELECT p.* 
                 FROM posts p
                 INNER JOIN labelsXposts lx ON p.postId = lx.postId
                 WHERE lx.labelId = ?`,
                [labelId]
            );
            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async getPostsByTitle(title) {
        try {
            const [result] = await db.query(
                `SELECT * FROM posts WHERE title LIKE ?`,
                [`%${title}%`]
            );

            return (result.length > 0) ? result : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async updatePost(postId, data) {
        try {
            const [result] = await db.query(
                `UPDATE posts SET ? WHERE postId = ?`,
                [data, postId]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async removeLabels(postId) {
        try {
            const [result] = await db.query(
                'DELETE FROM labelsXposts WHERE postId = ?',
                [postId]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async deletePost(postId) {
        try {
            const [result] = await db.query(
                'DELETE FROM posts WHERE postId = ?',
                [postId]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async addReaction(data) {
        try {
            const { postId, userId } = data;
            const [result] = await db.query(
                'INSERT INTO postsReactions (postId, userId) VALUES (?, ?)',
                [postId, userId]
            );
            return (result.insertId) ? result.insertId : null;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    },

    async removeReaction(data) {
        try {
            const { postId, userId } = data;
            const [result] = await db.query(
                'DELETE FROM postsReactions WHERE postId = ? AND userId = ?',
                [postId, userId]
            );
            return result.affectedRows > 0;
        } catch (err) {
            throw ({ message: err.message, statusCode: err.code || 500 });
        }
    }
}

export default postsRepository;
