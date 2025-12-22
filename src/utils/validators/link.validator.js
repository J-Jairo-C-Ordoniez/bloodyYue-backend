export default function isLink(value) {
    const linkRegex = /^https?:\/\//;
    return linkRegex.test(value);
}