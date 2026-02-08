import rolesService from './roles.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';

const rolesController = {
    createRole: asyncHandler(async (req, res) => {
        const role = await rolesService.createRole(req.body);
        success(req, res, role, 201);
    }),

    getAllRoles: asyncHandler(async (req, res) => {
        const roles = await rolesService.getAllRoles();
        success(req, res, roles, 200);
    }),

    getRoleById: asyncHandler(async (req, res) => {
        const { rolId } = req.params;
        const role = await rolesService.getRoleById(rolId);
        success(req, res, role, 200);
    }),

    getAllPermits: asyncHandler(async (req, res) => {
        const permits = await rolesService.getAllPermits();
        success(req, res, permits, 200);
    }),

    assignPermit: asyncHandler(async (req, res) => {
        const { rolId, permitId } = req.body;
        const result = await rolesService.assignPermitToRole(rolId, permitId);
        success(req, res, result, 200);
    }),

    removePermit: asyncHandler(async (req, res) => {
        const { rolId, permitId } = req.body;
        const result = await rolesService.removePermitFromRole(rolId, permitId);
        success(req, res, result, 200);
    })
}

export default rolesController;