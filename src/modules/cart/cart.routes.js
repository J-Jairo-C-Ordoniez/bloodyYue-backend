import { Router } from 'express';
import * as cartController from './cart.controller.js';

const router = Router();

router.post('/add', cartController.addToCart); // Changed to /add for clarity, or keep /
router.get('/:userId', cartController.getCart);
router.delete('/item/:cartItemId', cartController.removeItem);
router.put('/item/:cartItemId', cartController.updateItem);

export default router;
