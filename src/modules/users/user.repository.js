import db from '../../config/db.js';

const userRepository = {
    getUserById: async (id) => {
        const [result] = await db.query(
            'SELECT userId, name, birthday, avatar, poster, isActive, isVerified, status FROM users WHERE userId = ?', [id]);
        
        return (result[0]) ? result[0] : null;
    },
};

export default userRepository;