import { error } from '../../utils/response/response.js';

export default function notFound(req, res, next) {
    return error(req, res, 'Not Found', 404);
}
