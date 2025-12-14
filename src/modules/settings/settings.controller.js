import * as settingsService from './settings.service.js';
import { success, error } from '../../utils/response/response.js';

export const getSettings = async (req, res) => {
    try {
        const settings = await settingsService.getSettings();
        success(req, res, settings, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};

export const updateSettings = async (req, res) => {
    try {
        const settings = await settingsService.updateSettings(req.body);
        success(req, res, settings, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};
