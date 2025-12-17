import { error } from '../../utils/response/response.js';
import verifyToken from '../../utils/tokens/verify.token.js';

export default function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return error(req, res, 'Authentication required', 401);
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyToken.accessToken(token);

        req.user = {
            userId: decoded.userId,
            rolId: decoded.rolId
        };

        next();
    } catch (err) {
        return error(req, res, 'Invalid or expired token', 401);
    }
}