import labelsRepository from "./labels.repository.js";
import validators from "../../utils/validators/index.js";
import AppError from "../../utils/errors/AppError.js";

const labelsService = {
    createLabel: async (data) => {
        const { name, color } = data;

        if (
            (!name && validators.isString(name)) ||
            (!color && validators.isHexadecial(color))
        ) {
            throw new AppError('Invalid input data', 400);
        }

        const label = await labelsRepository.createLabel({ name, color });
        if (!label) {
            throw new AppError('Label not created', 400);
        }

        return label;
    },

    getLabels: async () => {
        const labels = await labelsRepository.getLabels();
        if (!labels) {
            throw new AppError('Labels not found', 404);
        }
        return labels;
    },

    getLabelById: async (id) => {
        if (!id) {
            throw new AppError('Invalid input data', 400);
        }

        const label = await labelsRepository.getLabelById(id);
        if (!label) {
            throw new AppError('Label not found', 404);
        }

        return label;
    },

    updateLabel: async (id, data) => {
        if (!id) {
            throw new AppError('Invalid input data', 400);
        }

        const errors = validators.validateUpdate(data);
        if (errors.length > 0) {
            throw new AppError('Invalid input data', 400);
        }

        const label = await labelsRepository.updateLabel(id, data);
        if (!label) {
            throw new AppError('Label not updated', 400);
        }

        return labelsService.getLabelById(id);
    },

    deleteLabel: async (id) => {
        if (!id) {
            throw new AppError('Invalid input data', 400);
        }

        const label = await labelsRepository.deleteLabel(id);
        if (!label) {
            throw new AppError('Label not deleted', 400);
        }

        return {
            message: 'Label deleted',
            labelId: id
        };
    }
}

export default labelsService;