import { error } from '../../utils/response/response.js';

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        console.error('ERROR', err);
    }

    error(req, res, err.message, err.statusCode);
};

export default globalErrorHandler;
