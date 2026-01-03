import { Router } from 'express';
import rolesController from './roles.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';
import authorizePermission from '../../middlewares/auth/authorize.middleware.js';

const router = Router();

router.post(
    '/', 
    authenticate,
    authorizePermission('createRole'),
    rolesController.createRole
);

router.get(
    '/', 
    authenticate,
    authorizePermission('readRole'),
    rolesController.getAllRoles
);

router.get(
    '/:rolId', 
    authenticate,
    authorizePermission('readRole'),
    rolesController.getRoleById
);

router.get(
    '/permits/all',
    authenticate,
    authorizePermission('readPermit'), 
    rolesController.getAllPermits
);

router.get(
    '/permits/:rolId',
    authenticate,
    authorizePermission('readPermit'), 
    rolesController.getPermitsByRoleId
);

router.post(
    '/permits/assign', 
    authenticate,
    authorizePermission('assignPermit'), 
    rolesController.assignPermit
);

router.post(
    '/permits/remove', 
    authenticate,
    authorizePermission('removePermit'), 
    rolesController.removePermit
);

export default router;