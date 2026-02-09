import { error } from '../../utils/response/response.js';
import config from '../../config/env.config.js';

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (config.env === 'development') {
        console.error('ERROR 💥', err);
        return error(req, res, {
            message: err.message,
            stack: err.stack,
            error: err
        }, err.statusCode);
    }

    if (err.isOperational) {
        return error(req, res, err.message, err.statusCode);
    }

    console.error('ERROR 💥', err);
    error(req, res, 'Something went very wrong!', 500);
};

export default globalErrorHandler;
