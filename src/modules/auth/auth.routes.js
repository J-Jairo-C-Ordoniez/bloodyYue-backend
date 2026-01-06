import { Router } from 'express';
import authController from './auth.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';
import authorizePermission from '../../middlewares/auth/authorize.middleware.js';

const router = Router();

router.post(
    '/register', 
    authController.register
);

router.post(
    '/login', 
    authController.login
);

router.post(
    '/logout', 
    authController.logout
);

router.post(
    '/code', 
    authController.sendCodeVerification
);

router.post(
    '/verify', 
    authController.verifyCode
);

router.post(
    '/resetPassword', 
    authController.resetPassword
);

router.post(
    '/changeRole', 
    authenticate, 
    authorizePermission('changeRole'), 
    authController.changeRole
);

router.post(
    '/refreshToken', 
    authController.refreshToken
);

router.patch(
    '/changeStatus',
    authenticate,
    authorizePermission('changeUserStatus'),
    authController.changeStatus
);

export default router;