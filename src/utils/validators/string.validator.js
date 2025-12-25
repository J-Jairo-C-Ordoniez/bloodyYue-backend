export default function isString(str) {
    const stringRegex = /^[a-zA-ZÀ-ÿ\s.,;:!?()""'']{5,}$/;
    return stringRegex.test(str.trim().toLowerCase());
}