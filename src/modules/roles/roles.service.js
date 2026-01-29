import rolesRepository from './roles.repository.js';
import validators from '../../utils/validators/index.js';
import AppError from '../../utils/errors/AppError.js';

const rolesService = {
    createRole: async (data) => {
        if (
            (!data.name || !validators.isString(data.name)) ||
            (!data.description || !validators.isString(data.description))
        ) {
            throw new AppError("Invalid Inputs", 400);
        }

        const newRole = await rolesRepository.createRole({
            name: data.name,
            description: data.description,
        });

        if (!newRole) {
            throw new AppError("Role creation failed", 500);
        }

        return { ...newRole };
    },

    getAllRoles: async () => {
        const roles = await rolesRepository.getAllRoles();
        if (!roles) {
            throw new AppError('Roles not found', 404);
        }

        return roles;
    },

    getRoleById: async (rolId) => {
        const role = await rolesRepository.getRoleById(rolId);
        if (!role) {
            throw new AppError('Role not found', 404);
        }

        const permitsByRol = await rolesRepository.getPermitsByRole(rolId);

        return { role, permits: permitsByRol };
    },

    getAllPermits: async () => {
        const permits = await rolesRepository.getAllPermits();
        if (!permits) {
            throw new AppError('Permits not found', 404);
        }

        return permits;
    },

    assignPermitToRole: async (rolId, permitId) => {
        const role = await rolesRepository.getRoleById(rolId);
        if (!role) {
            throw new AppError('Role not found', 404);
        }

        const permitsByRol = await rolesRepository.getPermitsByRole(rolId);
        if (permitsByRol && permitsByRol.some(permit => permit.permitId === permitId)) {
            throw new AppError('Permit already assigned to role', 400);
        }

        const updatedRole = await rolesRepository.assignPermitToRole(rolId, permitId);
        if (!updatedRole) {
            throw new AppError('Permit assignment failed', 500);
        }

        return { message: 'Permit assigned successfully' };
    },

    removePermitFromRole: async (rolId, permitId) => {
        const role = await rolesRepository.getRoleById(rolId);
        if (!role) {
            throw new AppError('Role not found', 404);
        }

        const permitsByRol = await rolesRepository.getPermitsByRole(rolId);
        if (!permitsByRol || !permitsByRol.some(permit => permit.permitId === permitId)) {
            throw new AppError('Permit not assigned to role', 400);
        }
        const updatedRole = await rolesRepository.removePermitFromRole(rolId, permitId);
        if (!updatedRole) {
            throw new AppError('Permit removal failed', 500);
        }
        return { message: 'Permit removed successfully' };
    }
};

export default rolesService;