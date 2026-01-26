import isString from "./string.validator.js";
import isLink from "./link.validator.js";
import isEmail from "./email.validator.js";
import isJson from "./json.validator.js";
import isHexadecial from "./hexadecial.validator.js";
import isPrice from "./price.validator.js";
import isNumber from "./number.validator.js";
import isDate from "./date.validator.js";

const validationRules = {
    name: isString,
    birthday: isDate,
    avatar: isLink,
    poster: isLink,
    description: isString,
    message: isString,
    title: isString,
    subtitle: isString,
    contentHero: isLink,
    email: isEmail,
    abaut: isString,
    work: isString,
    redes: isJson,
    usagePolicies: isString,
    color: isHexadecial,
    price: isPrice,
    terms: isString,
    quantity: isNumber,
    details: isString,
    content: isLink,
    exampleId: isNumber
}

export default function validateUpdate(data) {
    const errors = [];

    for (const key in data) {   
        if (key === 'labels' || key === 'typePost') continue;
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