export default function isString(str) {
    const stringRegex = /^[a-zA-Z ]{5,}$/;
    return stringRegex.test(str.trim().toLowerCase());
}