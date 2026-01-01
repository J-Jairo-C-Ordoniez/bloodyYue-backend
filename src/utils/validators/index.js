import isEmail from "./email.validator.js";
import isPassword from "./password.validator.js";
import isString from "./string.validator.js";
import isLink from "./link.validator.js";
import validateUpdate from "./update.validator.js";
import isHexadecial from "./hexadecial.validator.js";

const validators = {
    isEmail,
    isPassword,
    isString,
    isLink,
    isHexadecial,
    validateUpdate
}

export default validators;