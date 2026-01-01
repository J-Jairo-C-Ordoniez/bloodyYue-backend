import { Router } from 'express';
import settingsController from './settings.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';
import authorize from '../../middlewares/auth/authorize.middleware.js';

const router = Router();

router.post(
    '/',
    authenticate,
    authorize('createSetting'),
    settingsController.createSettings
);

router.get(
    '/:id',
    settingsController.getSettings
);

router.put(
    '/:id',
    authenticate,
    authorize('updateSetting'),
    settingsController.updateSettings
);

export default router;