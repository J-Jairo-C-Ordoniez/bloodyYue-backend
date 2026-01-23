import { Router } from 'express';
import commissionsController from './commissions.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';
import authorizePermission from '../../middlewares/auth/authorize.middleware.js';

const router = Router();

router.post(
    '/',
    authenticate,
    authorizePermission('createCommission'),
    commissionsController.createCommission
);

router.get(
    '/list/:id',
    commissionsController.getCommissions
);

router.get(
    '/:id',
    commissionsController.getCommissionsById
);

router.get(
    '/filter/label/:labelId',
    authenticate,
    commissionsController.getCommissionsByLabel
);

router.get(
    '/filter/title/:title',
    authenticate,
    commissionsController.getCommissionsByTitle
);

router.get(
    '/filter/price/:price',
    authenticate,
    commissionsController.getCommissionsByPrice
);

router.put(
    '/:id',
    authenticate,
    authorizePermission('updateCommission'),
    commissionsController.updateCommission
);

router.put(
    '/:id/labels',
    authenticate,
    authorizePermission('updateCommission'),
    commissionsController.updateCommissionLabels
);

export default router;
