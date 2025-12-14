import { Router } from 'express';
import * as salesController from './sales.controller.js';

const router = Router();

router.post('/', salesController.createSale);
router.get('/', salesController.getSales);

export default router;
