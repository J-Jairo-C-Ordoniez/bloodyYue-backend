import { Router } from 'express';
import cartController from './cart.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';

const router = Router();

router.post(
    '/items', 
    authenticate,
    cartController.addToCart
); 

router.get(
    '/items', 
    authenticate,
    cartController.getAllItemsCart
);
router.get(
    '/items/:cartItemId', 
    cartController.getItemById
);
router.put(
    '/items/:cartItemId', 
    cartController.updateItem
);
router.patch(
    '/items/:cartItemId/discarded', 
    cartController.changeItemStatus
);

export default router;


/* commission -> cart -> cartItem -> sale -> detailsSale -> chat */