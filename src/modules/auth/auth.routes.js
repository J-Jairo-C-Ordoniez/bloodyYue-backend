import { Router } from 'express';
import authController from './auth.controller.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/code', authController.sendCodeVerification);
router.post('/verify', authController.verifyCode);
router.post('/changePassword', authController.changePassword);
router.post('/changeRole', authController.changeRole);
router.post('/refreshToken', authController.refreshToken);

export default router;
