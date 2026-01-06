import { Router } from 'express';
import { upload } from '../../middlewares/media/media.middleware.js';
import mediaController from './media.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';

const router = Router();

router.post(
    '/images/user',
    authenticate,
    upload.single('file'),
    mediaController.uploadImageUser
);

router.post(
    '/images/post',
    authenticate,
    upload.single('file'),
    mediaController.uploadImagePost
);

router.post(
    '/shorts/post',
    authenticate,
    upload.single('file'),
    mediaController.uploadShortsPost
);

router.post(
    '/images/commission',
    authenticate,
    upload.single('file'),
    mediaController.uploadImageCommission
);

router.post(
    '/images/hero',
    authenticate,
    upload.single('file'),
    mediaController.uploadImageHero
);

export default router;