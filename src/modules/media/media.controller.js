import { error, success } from "../../utils/response/response.js";
import mediaService from "./media.service.js";


const mediaController = {
    uploadImageUser: async (req, res) => {
        try {
            const { context } = req.body;
            const file = req.file;
            const userId = req.user.userId;

            if (!file) {
                return error(req, res, 'File is required', 400);
            }

            if (!userId) {
                return error(req, res, 'User is required', 400);
            }

            const folder = `users/${userId}`;
            const publicId = context;

            const url = await mediaService.uploadImage(file, folder, publicId);

            success(req, res, url, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    uploadImagePost: async (req, res) => {
        try {
            const { context } = req.body;
            const file = req.file;

            if (!file) {
                return error(req, res, 'File is required', 400);
            }

            const folder = `posts/`;
            const publicId = context;

            const url = await mediaService.uploadImage(file, folder, publicId);

            success(req, res, url, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    uploadShortsPost: async (req, res) => {
        try {
            const { context } = req.body;
            const file = req.file;
            const userId = req.user.userId;

            if (!file) {
                return error(req, res, 'File is required', 400);
            }

            if (!userId) {
                return error(req, res, 'User is required', 400);
            }

            const folder = `posts/`;
            const publicId = context;

            const url = await mediaService.uploadShorts(file, folder, publicId);

            success(req, res, url, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    uploadImageCommission: async (req, res) => {
        try {
            const { context } = req.body;
            const file = req.file;

            if (!file) {
                return error(req, res, 'File is required', 400);
            }

            const folder = `commissions/`;
            const publicId = context;

            const url = await mediaService.uploadImage(file, folder, publicId);

            success(req, res, url, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    uploadImageHero: async (req, res) => {
        try {
            const { context } = req.body;
            const file = req.file;

            if (!file) {
                return error(req, res, 'File is required', 400);
            }

            const folder = `hero/`;
            const publicId = context;

            const url = await mediaService.uploadImage(file, folder, publicId);

            success(req, res, url, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },
};

export default mediaController;