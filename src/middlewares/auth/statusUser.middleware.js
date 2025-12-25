import authRepository from "../../modules/auth/auth.repository.js";
import { error } from "../../utils/response/response.js";

export default async function statusUser(req, res, next) {
    try {
        if (!req.user) {
            return error(req, res, 'Authentication required', 401);
        }

        const user = await authRepository.getByUserId(req.user.userId);

        if (!user) {
            return error(req, res, 'User not found', 404);
        }

        if (user.status !== 'active') {
            return error(req, res, `User is not active, user status: ${user.status}`, 403);
        }

        next();
    } catch (err) {
        return error(req, res, err.message, err.code);
    }
}