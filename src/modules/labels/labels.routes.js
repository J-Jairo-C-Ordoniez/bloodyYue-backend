import { Router } from "express";
import authenticate from "../../middlewares/auth/authenticate.middleware.js";
import authorizePermission from "../../middlewares/auth/authorize.middleware.js";
import labelsController from "./labels.controller.js";

const router = Router();

router.post(
    '/',
    authenticate,
    authorizePermission('createLabels'),
    labelsController.createLabel
);

router.get(
    '/',
    authenticate,
    labelsController.getLabels
);

router.get(
    '/:id',
    authenticate,
    labelsController.getLabelById
)

router.put(
    '/:id',
    authenticate,
    authorizePermission('updateLabels'),
    labelsController.updateLabel
);

router.delete(
    '/:id',
    authenticate,
    authorizePermission('deleteLabels'),
    labelsController.deleteLabel
);


export default router;