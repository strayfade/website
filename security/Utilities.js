// Credit https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const RandomStringWithLength = (Length) => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < Length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = { RandomStringWithLength }
