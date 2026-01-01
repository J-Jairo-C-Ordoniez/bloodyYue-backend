import labelsService from "../services/labels.service.js";
import { error, success } from "../../utils/response/response.js";

const labelsController = {
    createLabel: async (req, res) => {
        try {
            const label = await labelsService.createLabel(req.body);
            success(req, res, label, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getLabels: async (req, res) => {
        try {
            const labels = await labelsService.getLabels();
            success(req, res, labels, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getLabelById: async (req, res) => {
        try {
            const label = await labelsService.getLabelById(req.params.id);
            success(req, res, label, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updateLabel: async (req, res) => {
        try {
            const label = await labelsService.updateLabel(req.params.id, req.body);
            success(req, res, label, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },
    
    deleteLabel: async (req, res) => {
        try {
            const labelDeleted = await labelsService.deleteLabel(req.params.id);
            success(req, res, labelDeleted, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    }
}

export default labelsController;