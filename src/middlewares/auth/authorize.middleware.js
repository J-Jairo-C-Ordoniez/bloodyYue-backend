import authRepository from "../../modules/auth/auth.repository";
import { error } from "../../utils/response/response";

export default function authorizePermission(permission) {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return error(req, res, 'Authentication required', 401);
            }

            const hasPermission = await authRepository.roleHasPermission(req.user.rolId, permission);

            if (!hasPermission) {
                return error(req, res, 'Access denied', 403);
            }

            next();
        } catch (err) {
            return error(req, res, err.message, err.code);
        }
    };
}