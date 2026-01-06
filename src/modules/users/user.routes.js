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

router.get(
    '/me/testimonies',
    authenticate,
    usersController.getMyTestimony
);

router.post(
    '/me/testimonies',
    authenticate,
    usersController.createTestimony
);

router.put(
    '/me/testimonies',
    authenticate,
    usersController.updateTestimony
);

router.delete(
    '/me/testimonies',
    authenticate,
    authorizePermission('deleteUserTestimony'),
    usersController.deleteTestimony
);

router.get(
    '/testimonies',
    authenticate,
    usersController.getTestimonies
);

export default router;