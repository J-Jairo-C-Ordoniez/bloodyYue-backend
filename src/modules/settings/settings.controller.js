import settingsService from './settings.service.js';
import { success, error } from '../../utils/response/response.js';

const settingsController = {
    createSettings: async (req, res) => {
        try {
            const settings = await settingsService.createSettings(req.body);
            success(req, res, settings, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getSettings: async (req, res) => {
        try {
            const settings = await settingsService.getSettings(req.params.id);
            success(req, res, settings, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updateSettings: async (req, res) => {
        try {
            const settings = await settingsService.updateSettings(req.params.id, req.body);
            success(req, res, settings, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },
};

export default settingsController;