import { Router } from 'express';
import salesController from './sales.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';
import authorizePermission from '../../middlewares/auth/authorize.middleware.js';

const router = Router();

router.post(
    '/create', 
    authenticate,
    salesController.createSale
);

router.get(
    '/list/:id', 
    authenticate,
    authorizePermission('readSales'),
    salesController.getSales
);

router.get(
    '/:id', 
    authenticate,
    salesController.getSaleById
);

router.get(
    '/sold', 
    authenticate,
    authorizePermission('readSales'),
    salesController.getSalesSold
);

router.get(
    '/me', 
    authenticate,
    salesController.getSalesByUserId
);

router.get(
    '/period/:period', 
    authenticate,
    authorizePermission('readSales'),
    salesController.getSalesByPeriod
);

router.patch(
    '/:id/status', 
    authenticate,
    salesController.updateSaleStatus
);

export default router;

/* CREATE TABLE IF NOT EXISTS detailsSale (
  detailsSaleId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  saleId INT UNSIGNED,
  status ENUM('pending', 'process', 'done'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (saleId) REFERENCES sales(saleId)
); */