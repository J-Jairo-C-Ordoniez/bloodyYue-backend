import rolesService from './roles.service.js';
import { success, error } from '../../utils/response/response.js';

export const getAllRoles = async (req, res) => {
    try {
        const roles = await rolesService.getAllRoles();
        success(req, res, roles, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};

export const getRoleById = async (req, res) => {
    try {
        const { rolId } = req.params;
        const role = await rolesService.getRoleById(rolId);
        success(req, res, role, 200);
    } catch (err) {
        error(req, res, err.message, 404);
    }
};

export const createRole = async (req, res) => {
    try {
        const role = await rolesService.createRole(req.body);
        success(req, res, role, 201);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const updateRole = async (req, res) => {
    try {
        const { rolId } = req.params;
        const role = await rolesService.updateRole(rolId, req.body);
        success(req, res, role, 200);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const deleteRole = async (req, res) => {
    try {
        const { rolId } = req.params;
        const result = await rolesService.deleteRole(rolId);
        success(req, res, result, 200);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const getAllPermits = async (req, res) => {
    try {
        const permits = await rolesService.getAllPermits();
        success(req, res, permits, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};

export const createPermit = async (req, res) => {
    try {
        const permit = await rolesService.createPermit(req.body);
        success(req, res, permit, 201);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const assignPermit = async (req, res) => {
    try {
        const { rolId, permitId } = req.body;
        const result = await rolesService.assignPermitToRole(rolId, permitId);
        success(req, res, result, 200);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const removePermit = async (req, res) => {
    try {
        const { rolId, permitId } = req.body;
        const result = await rolesService.removePermitFromRole(rolId, permitId);
        success(req, res, result, 200);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};
