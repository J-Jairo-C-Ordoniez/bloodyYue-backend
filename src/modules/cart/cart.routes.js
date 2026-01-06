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
    authenticate,
    cartController.getItemById
);
router.put(
    '/items/:cartItemId', 
    authenticate,
    cartController.updateItem
);
router.patch(
    '/items/:cartItemId/discarded', 
    authenticate,
    cartController.changeItemStatus
);

export default router;


/* commission -> cart -> cartItem -> sale -> detailsSale -> chat */