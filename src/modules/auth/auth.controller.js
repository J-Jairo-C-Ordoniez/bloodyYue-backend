import authService from './auth.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';
import config from '../../config/env.config.js';

const authController = {
    register: asyncHandler(async (req, res) => {
        const user = await authService.register(req.body);
        success(req, res, user, 201);
    }),

    login: asyncHandler(async (req, res) => {
        const { accessToken, refreshToken, user } = await authService.login(req.body);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: config.env === 'production',
            sameSite: config.env === 'production' ? 'none' : 'lax', // Adjusted for local dev vs production
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        success(req, res, { user, accessToken }, 200);
    }),

    logout: asyncHandler(async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;

        await authService.logout(refreshToken);

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: config.env === 'production',
            sameSite: config.env === 'production' ? "none" : "lax"
        });

        success(req, res, 'Logout successful', 200);
    }),

    sendCodeVerification: asyncHandler(async (req, res) => {
        await authService.sendCodeVerification(req.body);
        success(req, res, 'Code verification sent successfully', 201);
    }),

    verifyCode: asyncHandler(async (req, res) => {
        const verify = await authService.verifyCode(req.body);
        success(req, res, verify, 201);
    }),

    resetPassword: asyncHandler(async (req, res) => {
        const user = await authService.resetPassword(req.body);
        success(req, res, user, 201);
    }),

    changeRole: asyncHandler(async (req, res) => {
        const user = await authService.changeRole(req.body);
        success(req, res, user, 201);
    }),

    refreshToken: asyncHandler(async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;
        const { accessToken, user } = await authService.refreshToken(refreshToken);

        success(req, res, { accessToken, user }, 201);
    }),

    changeStatus: asyncHandler(async (req, res) => {
        const user = await authService.changeStatus(req.body);
        success(req, res, user, 200);
    }),
};

export default authController;
