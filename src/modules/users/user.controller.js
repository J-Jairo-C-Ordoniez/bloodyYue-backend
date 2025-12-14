import * as userService from './user.service.js';
import { success, error } from '../../utils/response/response.js';

export const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        success(req, res, users, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};

export const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        success(req, res, user, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};
