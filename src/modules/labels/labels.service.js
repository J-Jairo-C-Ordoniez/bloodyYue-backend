import labelsRepository from "./labels.repository.js";
import validators from "../../utils/validators/index.js";

const labelsService = {
    createLabel: async (data) => {
        const {name, color} = data;

        if (
            (!name && validators.isString(name)) ||
            (!color && validators.isHexadecial(color))
        ) {
            throw ({message: 'Invalid input data', statusCode: 400});
        }

        const label = await labelsRepository.createLabel({name, color});
        if (!label) {
            throw ({message: 'Label not created', statusCode: 400});
        }

        return label;
    },

    getLabels: async () => {
        const labels = await labelsRepository.getLabels();
        if (!labels) {
            throw ({message: 'Labels not found', statusCode: 404});
        }
        return labels;
    },

    getLabelById: async (id) => {
        if (!id) {
            throw ({message: 'Invalid input data', statusCode: 400});
        }

        const label = await labelsRepository.getLabelById(id);
        if (!label) {
            throw ({message: 'Label not found', statusCode: 404});
        }

        return label;
    },

    updateLabel: async (id, data) => {
        if (!id) {
            throw ({message: 'Invalid input data', statusCode: 400});
        }

        const errors = validators.validateUpdate(data);
        if (errors.length > 0) {
            throw ({message: 'Invalid input data', statusCode: 400});
        }

        const label = await labelsRepository.updateLabel(id, data);
        if (!label) {
            throw ({message: 'Label not updated', statusCode: 400});
        }

        return labelsService.getLabelById(id);
    },

    deleteLabel: async (id) => {
        if (!id) {
            throw ({message: 'Invalid input data', statusCode: 400});
        }

        const label = await labelsRepository.deleteLabel(id);
        if (!label) {
            throw ({message: 'Label not deleted', statusCode: 400});
        }

        return {
            message: 'Label deleted',
            labelId: id
        };
    }
}

export default labelsService;