import isEmail from "./email.validator.js";
import isPassword from "./password.validator.js";
import isString from "./string.validator.js";
import isLink from "./link.validator.js";
import validateUpdate from "./update.validator.js";
import isHexadecial from "./hexadecial.validator.js";
import isPrice from "./price.validator.js";
import isPeriod from "./period.validator.js";
import isNumber from "./number.validator.js";

const validators = {
    isEmail,
    isPassword,
    isString,
    isLink,
    isHexadecial,
    isPrice,
    isPeriod,
    isNumber,
    validateUpdate,
}

export default validators;