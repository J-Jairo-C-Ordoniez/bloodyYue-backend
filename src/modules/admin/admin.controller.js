import * as adminService from './admin.service.js';
import { success, error } from '../../utils/response/response.js';

export const getDashboardStats = async (req, res) => {
    try {
        const stats = await adminService.getDashboardStats();
        success(req, res, stats, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};
