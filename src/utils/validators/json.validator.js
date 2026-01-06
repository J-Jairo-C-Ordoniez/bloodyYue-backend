export default function isJson(value) {
    try {
        JSON.stringify(value)
    } catch (error) {
        return false
    }

    return true
}