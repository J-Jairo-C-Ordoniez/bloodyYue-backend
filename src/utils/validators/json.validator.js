export default function isJson(value) {
    try {
        JSON.parse(value)
    } catch (error) {
        return false
    }

    return true
}