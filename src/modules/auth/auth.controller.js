import authService from './auth.service.js';
import { success, error } from '../../utils/response/response.js';

const authController = {
    register: async (req, res) => {
        try {
            const user = await authService.register(req.body);
            success(req, res, user, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    login: async (req, res) => {
        try {
            const { accessToken, refreshToken, user } = await authService.login(req.body);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODEENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            success(req, res, { user, accessToken }, 200);

        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    logout: async (req, res) => {
        try {
            const refreshToken = req.cookies?.refreshToken;

            await authService.logout(refreshToken);

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODEENV === "production",
                sameSite: "strict"
            });

            success(req, res, 'Logout successful', 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    sendCodeVerification: async (req, res) => {
        try {
            await authService.sendCodeVerification(req.body);
            success(req, res, 'Code verification sent successfully', 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    verifyCode: async (req, res) => {
        try {
            const verify = await authService.verifyCode(req.body);
            success(req, res, verify, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    resetPassword: async (req, res) => {
        try {
            const user = await authService.resetPassword(req.body);
            success(req, res, user, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    changeRole: async (req, res) => {
        try {
            const user = await authService.changeRole(req.body);
            success(req, res, user, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    refreshToken: async (req, res) => { 
        try {
            const refreshToken = req.cookies?.refreshToken;
            const user = await authService.refreshToken(refreshToken);
            success(req, res, user, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    changeStatus: async (req, res) => {
        try {
            const user = await authService.changeStatus(req.body);
            success(req, res, user, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },
};

export default authController;
