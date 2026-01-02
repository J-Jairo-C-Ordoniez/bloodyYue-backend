import { Router } from 'express';
import * as rolesController from './roles.controller.js';

const router = Router();

// Roles
router.get('/', rolesController.getAllRoles);
router.get('/:rolId', rolesController.getRoleById);
router.post('/', rolesController.createRole);
router.put('/:rolId', rolesController.updateRole);
router.delete('/:rolId', rolesController.deleteRole);

// Permits
router.get('/permits/all', rolesController.getAllPermits);
router.post('/permits', rolesController.createPermit);
router.post('/assign-permit', rolesController.assignPermit);
router.post('/remove-permit', rolesController.removePermit);

export default router;
