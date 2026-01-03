import rolesRepository from './roles.repository.js';

const rolesService = {
    createRole: async (data) => {
        const { rol, permits } = data;

        if (
            (!rol.name || !validators.isString(rol.name)) ||
            (!rol.description || !validators.isString(rol.description))
        ) {
            throw ({ message: "Invalid Inputs", statusCode: 400 });
        }

        const newRole = await rolesRepository.createRole({
            name: rol.name,
            description: rol.description,
        });

        if (!newRole) {
            throw ({ message: "Role creation failed", statusCode: 500 });
        }

        if (permits && permits.length > 0) {
            await rolesRepository.assignPermitToRole(newRole.rolId, permits);
        }

        return { ...newRole, permits };
    },

    getAllRoles: async () => {
        const roles = await rolesRepository.getAllRoles();
        if (!roles) {
            throw ({message: 'Roles not found', statusCode: 404});
        }
        
        return roles;
    },

    getRoleById: async (rolId) => {
        const role = await rolesRepository.getRoleById(rolId);
        if (!role) {
            throw ({message: 'Role not found', statusCode: 404});
        }
        
        return role;
    },

    getAllPermits: async () => {
        const permits = await rolesRepository.getAllPermits();
        if (!permits) {
            throw ({message: 'Permits not found', statusCode: 404});
        }
        
        return permits;
    },

    getPermitsByRoleId: async (rolId) => {
        const permits = await rolesRepository.getPermitsByRoleId(rolId);
        if (!permits) {
            throw ({message: 'Permits not found', statusCode: 404});
        }
        
        return permits;
    },

    assignPermitToRole: async (rolId, permitId) => {
        const role = await rolesRepository.getPermitsByRoleId(rolId);
        if (!role) {
            throw ({message: 'Role not found', statusCode: 404});
        }

        if (role.some(permit => permit.permitId === permitId)) {
            throw ({message: 'Permit already assigned to role', statusCode: 400});
        }

        const updatedRole = await rolesRepository.assignPermitToRole(rolId, permitId);
        if (!updatedRole) {
            throw ({message: 'Permit assignment failed', statusCode: 500});
        }

        return { message: 'Permit assigned successfully' };
    },

    removePermitFromRole: async (rolId, permitId) => {
        const role = await rolesRepository.getPermitsByRoleId(rolId);
        if (!role) {
            throw ({message: 'Role not found', statusCode: 404});
        }

        if (!role.some(permit => permit.permitId === permitId)) {
            throw ({message: 'Permit not assigned to role', statusCode: 400});
        }

        const updatedRole = await rolesRepository.removePermitFromRole(rolId, permitId);
        if (!updatedRole) {
            throw ({message: 'Permit removal failed', statusCode: 500});
        }
        return { message: 'Permit removed successfully' };
    }
};

export default rolesService;