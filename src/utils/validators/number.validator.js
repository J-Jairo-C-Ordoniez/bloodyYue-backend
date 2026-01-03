export default function isNumer(value) {
    const numberRegex = /^\d+$/;
    return numberRegex.test(value);
}