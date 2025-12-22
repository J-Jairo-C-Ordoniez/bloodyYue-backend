import { Router } from 'express';
import usersController from './user.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';
import authorizePermission from '../../middlewares/auth/authorize.middleware.js';

const router = Router();

router.get(
    '/me',
    authenticate,
    usersController.getMyProfile
);

router.put(
    '/me',
    authenticate,
    usersController.updateMyProfile
);

router.patch(
    '/:id/status',
    authenticate,
    authorizePermission('changeUserStatus'),
    usersController.changeStatus
);

router.get(
    '/testimony/me',
    authenticate,
    usersController.getMyTestimony
);

router.post(
    '/testimonies',
    authenticate,
    usersController.createTestimony
);

router.put(
    '/testimonies/:id',
    authenticate,
    usersController.updateTestimony
);

router.delete(
    '/testimonies/:id',
    authenticate,
    usersController.deleteTestimony
);

export default router;