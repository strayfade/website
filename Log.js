function P(Input) {
    return Input.toString().length < 2 ? "0" + Input : Input
}
function Q(Input) {
    for (var x = 0; x < 4; x++) {
        if (Input.toString().length < 4) {
            Input = "0" + Input
        }
    }
    return Input
}
function GetFormattingTag() {
    var D = new Date(Date.now())
    var FormattingTag = P(D.getDay()) + "/" + P(D.getMonth()) + "/" + D.getFullYear()
    FormattingTag += " | " + P(D.getHours()) + ":" + P(D.getMinutes()) + ":" + P(D.getSeconds()) + "." + Q(D.getMilliseconds())
    return "[" + FormattingTag + "]"
}
function Log(String) {
    console.log(GetFormattingTag() + " - " + String.toString()) // it already is a string though!
}

module.exports = { Log }