export default function isString(str) {
    const stringRegex = /^[a-zA-Z ]+$/;
    return stringRegex.test(str.trim());
}