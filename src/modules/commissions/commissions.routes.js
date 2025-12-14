import { Router } from 'express';
import * as commissionsController from './commissions.controller.js';

const router = Router();

router.post('/', commissionsController.createCommission);
router.get('/', commissionsController.getCommissions);

export default router;
