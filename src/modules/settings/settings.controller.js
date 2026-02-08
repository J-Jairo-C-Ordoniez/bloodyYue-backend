import settingsService from './settings.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';

const settingsController = {
    createSettings: asyncHandler(async (req, res) => {
        const settings = await settingsService.createSettings(req.body);
        success(req, res, settings, 201);
    }),

    getSettings: asyncHandler(async (req, res) => {
        const settings = await settingsService.getSettings(req.params.id);
        success(req, res, settings, 200);
    }),

    updateSettings: asyncHandler(async (req, res) => {
        const settings = await settingsService.updateSettings(req.params.id, req.body);
        success(req, res, settings, 200);
    }),
};

export default settingsController;