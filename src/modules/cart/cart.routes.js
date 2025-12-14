import { Router } from 'express';
import * as cartController from './cart.controller.js';

const router = Router();

router.post('/', cartController.addToCart);
router.get('/:userId', cartController.getCart);

export default router;
