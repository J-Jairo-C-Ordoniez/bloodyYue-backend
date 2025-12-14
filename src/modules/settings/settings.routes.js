import { Router } from 'express';
import * as settingsController from './settings.controller.js';

const router = Router();

router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);

export default router;
