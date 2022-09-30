function GetFormattingTag() {
    var D = new Date(Date.now())
    var FormattingTag = D.getDay() + "/" + D.getMonth() + "/" + D.getFullYear()
    FormattingTag += " | " + D.getHours() + ":" + D.getMinutes() + ":" + D.getSeconds() + "." + D.getMilliseconds()
    return "[" + FormattingTag + "]"
}
function Log(String) {
    console.log(GetFormattingTag() + " - " + String.toString()) // it already is a string though!
}

module.exports = { Log }