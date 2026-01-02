import rolesRepository from './roles.repository.js';

const rolesService = {
    getAllRoles: async () => {
        return await rolesRepository.getAllRoles();
    },

    getRoleById: async (rolId) => {
        const role = await rolesRepository.getRoleById(rolId);
        if (!role) {
            throw new Error('Role not found');
        }
        const permits = await rolesRepository.getPermitsByRoleId(rolId);
        return { ...role, permits };
    },

    createRole: async (roleData) => {
        return await rolesRepository.createRole(roleData);
    },

    updateRole: async (rolId, roleData) => {
        const updated = await rolesRepository.updateRole(rolId, roleData);
        if (!updated) {
            throw new Error('Role not found or not updated');
        }
        return await rolesRepository.getRoleById(rolId);
    },

    deleteRole: async (rolId) => {
        const deleted = await rolesRepository.deleteRole(rolId);
        if (!deleted) {
            throw new Error('Role not found or could not be deleted');
        }
        return { message: 'Role deleted successfully' };
    },

    getAllPermits: async () => {
        return await rolesRepository.getAllPermits();
    },

    createPermit: async (permitData) => {
        return await rolesRepository.createPermit(permitData);
    },

    assignPermitToRole: async (rolId, permitId) => {
        const role = await rolesRepository.getRoleById(rolId);
        if (!role) throw new Error('Role not found');

        // Check if already assigned could be added here, but DB constraints might handle duplicates if set

        await rolesRepository.assignPermitToRole(rolId, permitId);
        return { message: 'Permit assigned successfully' };
    },

    removePermitFromRole: async (rolId, permitId) => {
        await rolesRepository.removePermitFromRole(rolId, permitId);
        return { message: 'Permit removed successfully' };
    }
};

export default rolesService;
