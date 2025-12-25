import isString from "./string.validator.js";
import isLink from "./link.validator.js";

const validationRules = {
    name: isString,
    birthday: isString,
    avatar: isLink,
    poster: isLink,
    description: isString,
    message: isString
}

export default function validateUpdate(data) {
    const errors = [];

    for (const key in data) {        
        const field = validationRules[key];
        
        if (!field) {
            errors.push({
                field: key,
                message: `${key} does not exist in allowed fields`
            });

            break;
        }
        
        if (!field(data[key])) {
            errors.push({
                field: key,
                message: `${key} is not valid`
            });
        }
    }

    return errors;
}