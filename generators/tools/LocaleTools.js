const Localize = (Locale, Key) => {
    return Locale[Key] ? Locale[Key] : Key.toString()
}
module.exports = { Localize }
