const P = (Input) => {
    return Input.toString().length < 2 ? '0' + Input : Input
}
const Q = (Input) => {
    for (let x = 0; x < 4; x++) {
        if (Input.toString().length < 4) {
            Input = '0' + Input
        }
    }
    return Input
}
const MakeFormat = () => {
    let D = new Date(Date.now())
    let FormattingTag = P(D.getDay()) + '/' + P(D.getMonth()) + '/' + D.getFullYear()
    FormattingTag +=
        ' | ' + P(D.getHours()) + ':' + P(D.getMinutes()) + ':' + P(D.getSeconds()) + '.' + Q(D.getMilliseconds())
    return '[' + FormattingTag + ']'
}
const Log = (String) => {
    console.log(MakeFormat() + ' - ' + String.toString())
}

module.exports = { Log }
