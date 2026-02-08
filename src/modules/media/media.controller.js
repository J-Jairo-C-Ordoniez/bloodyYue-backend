import { success } from "../../utils/response/response.js";
import mediaService from "./media.service.js";
import asyncHandler from "../../utilsCode/asyncHandler.js";
import AppError from "../../utils/errors/AppError.js";

const mediaController = {
    uploadImageUser: asyncHandler(async (req, res) => {
        const { context } = req.body;
        const file = req.file;
        const userId = req.user.userId;

        if (!file) throw new AppError('File is required', 400);
        if (!userId) throw new AppError('User is required', 400);

        const folder = `users/${userId}`;
        const publicId = context;

        const url = await mediaService.uploadImage(file, folder, publicId);
        success(req, res, url, 201);
    }),

    uploadImagePost: asyncHandler(async (req, res) => {
        const { context } = req.body;
        const file = req.file;

        if (!file) throw new AppError('File is required', 400);

        const folder = `posts/`;
        const publicId = context;

        const url = await mediaService.uploadImage(file, folder, publicId);
        success(req, res, url, 201);
    }),

    uploadShortsPost: asyncHandler(async (req, res) => {
        const { context } = req.body;
        const file = req.file;
        const userId = req.user.userId;

        if (!file) throw new AppError('File is required', 400);
        if (!userId) throw new AppError('User is required', 400);

        const folder = `posts/`;
        const publicId = context;

        const url = await mediaService.uploadShorts(file, folder, publicId);
        success(req, res, url, 201);
    }),

    uploadImageCommission: asyncHandler(async (req, res) => {
        const { context } = req.body;
        const file = req.file;

        if (!file) throw new AppError('File is required', 400);

        const folder = `commissions/`;
        const publicId = context;

        const url = await mediaService.uploadImage(file, folder, publicId);
        success(req, res, url, 201);
    }),

    uploadImageHero: asyncHandler(async (req, res) => {
        const { context } = req.body;
        const file = req.file;

        if (!file) throw new AppError('File is required', 400);

        const folder = `hero/`;
        const publicId = context;

        const url = await mediaService.uploadImage(file, folder, publicId);
        success(req, res, url, 201);
    }),
};

export default mediaController;