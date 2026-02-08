import userService from './user.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';

const usersController = {
    getUsers: asyncHandler(async (req, res) => {
        const users = await userService.getUsers();
        success(req, res, users, 200);
    }),

    getMyProfile: asyncHandler(async (req, res) => {
        const user = await userService.getMyProfile(req.user.userId);
        success(req, res, user, 200);
    }),

    updateMyProfile: asyncHandler(async (req, res) => {
        const user = await userService.updateMyProfile(req.user.userId, req.body);
        success(req, res, user, 200);
    }),

    getMyTestimony: asyncHandler(async (req, res) => {
        const testimony = await userService.getMyTestimony(req.user.userId);
        success(req, res, testimony, 200);
    }),

    createTestimony: asyncHandler(async (req, res) => {
        const testimony = await userService.createTestimony(req.user.userId, req.body);
        success(req, res, testimony, 200);
    }),

    updateTestimony: asyncHandler(async (req, res) => {
        const testimony = await userService.updateTestimony(req.user.userId, req.body);
        success(req, res, testimony, 200);
    }),

    deleteTestimony: asyncHandler(async (req, res) => {
        const testimony = await userService.deleteTestimony(req.user.userId);
        success(req, res, testimony, 200);
    }),

    getTestimonies: asyncHandler(async (req, res) => {
        const testimonies = await userService.getTestimonies();
        success(req, res, testimonies, 200);
    }),
}

export default usersController;
