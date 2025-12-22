import userService from './user.service.js';
import { success, error } from '../../utils/response/response.js';

const usersController = {
    getMyProfile: async (req, res) => {
        try {
            const user = await userService.getMyProfile(req.user.userId);
            success(req, res, user, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updateMyProfile: async (req, res) => {
        try {
            const user = await userService.updateMyProfile(req.user.userId, req.body);
            success(req, res, user, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    changeStatus: async (req, res) => {
        try {
            const user = await userService.changeStatus(req.user.userId, req.body);
            success(req, res, user, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getMyTestimonies: async (req, res) => {
        try {
            const testimonies = await userService.getMyTestimonies(req.user.userId);
            success(req, res, testimonies, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    createTestimony: async (req, res) => {
        try {
            const testimony = await userService.createTestimony(req.user.userId, req.body);
            success(req, res, testimony, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updateTestimony: async (req, res) => {
        try {
            const testimony = await userService.updateTestimony(req.user.userId, req.body);
            success(req, res, testimony, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    deleteTestimony: async (req, res) => {
        try {
            const testimony = await userService.deleteTestimony(req.user.userId, req.body);
            success(req, res, testimony, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },
}

export default usersController;