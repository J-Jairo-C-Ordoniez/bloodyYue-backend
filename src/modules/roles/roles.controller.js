import rolesService from './roles.service.js';
import { success, error } from '../../utils/response/response.js';

const rolesController = {
    createRole: async (req, res) => {
        try {
            const role = await rolesService.createRole(req.body);
            success(req, res, role, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getAllRoles: async (req, res) => {
        try {
            const roles = await rolesService.getAllRoles();
            success(req, res, roles, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getRoleById: async (req, res) => {
        try {
            const { rolId } = req.params;
            const role = await rolesService.getRoleById(rolId);
            success(req, res, role, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getAllPermits: async (req, res) => {
        try {
            const permits = await rolesService.getAllPermits();
            success(req, res, permits, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    assignPermit: async (req, res) => {
        try {
            const { rolId, permitId } = req.body;
            const result = await rolesService.assignPermitToRole(rolId, permitId);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    removePermit: async (req, res) => {
        try {
            const { rolId, permitId } = req.body;
            const result = await rolesService.removePermitFromRole(rolId, permitId);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    }
}

export default rolesController;