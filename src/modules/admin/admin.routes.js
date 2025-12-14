import { Router } from 'express';
import * as adminController from './admin.controller.js';

const router = Router();

router.get('/dashboard', adminController.getDashboardStats);

export default router;
