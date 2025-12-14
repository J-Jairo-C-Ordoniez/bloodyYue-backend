export const success = (req, res, message = 'OK', status = 200) => {
    res.status(status).json({
        error: false,
        status,
        body: message
    });
}

export const error = (req, res, message = 'Internal Server Error', status = 500) => {
    res.status(status).json({
        error: true,
        status,
        body: message
    });
}
