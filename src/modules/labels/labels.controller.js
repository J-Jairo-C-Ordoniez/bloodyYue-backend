import labelsService from "./labels.service.js";
import { success } from "../../utils/response/response.js";
import asyncHandler from "../../utilsCode/asyncHandler.js";

const labelsController = {
    createLabel: asyncHandler(async (req, res) => {
        const label = await labelsService.createLabel(req.body);
        success(req, res, label, 201);
    }),

    getLabels: asyncHandler(async (req, res) => {
        const labels = await labelsService.getLabels();
        success(req, res, labels, 200);
    }),

    getLabelById: asyncHandler(async (req, res) => {
        const label = await labelsService.getLabelById(req.params.id);
        success(req, res, label, 200);
    }),

    updateLabel: asyncHandler(async (req, res) => {
        const label = await labelsService.updateLabel(req.params.id, req.body);
        success(req, res, label, 200);
    }),

    deleteLabel: asyncHandler(async (req, res) => {
        const labelDeleted = await labelsService.deleteLabel(req.params.id);
        success(req, res, labelDeleted, 200);
    })
}

export default labelsController;