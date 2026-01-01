export default function isPrice(price) {
    const priceRegex = /^\d{1,8}(\.\d{1,2})?$/;
    return priceRegex.test(price);
}