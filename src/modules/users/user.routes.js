import { Router } from 'express';
import usersController from './user.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';
import authorizePermission from '../../middlewares/auth/authorize.middleware.js';
import statusUser from '../../middlewares/auth/statusUser.middleware.js';

const router = Router();

router.get(
    '/me',
    authenticate,
    statusUser,
    usersController.getMyProfile
);

router.put(
    '/me',
    authenticate,
    statusUser,
    usersController.updateMyProfile
);

router.get(
    '/me/testimonies',
    authenticate,
    statusUser,
    usersController.getMyTestimony
);

router.post(
    '/me/testimonies',
    authenticate,
    statusUser,
    usersController.createTestimony
);

router.put(
    '/me/testimonies',
    authenticate,
    statusUser,
    usersController.updateTestimony
);

router.delete(
    '/me/testimonies',
    authenticate,
    statusUser,
    authorizePermission('deleteUserTestimony'),
    usersController.deleteTestimony
);

router.get(
    '/testimonies',
    authenticate,
    usersController.getTestimonies
);

export default router;