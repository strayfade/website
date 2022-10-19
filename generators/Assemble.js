const { Localize } = require('./tools/LocaleTools')

function GeneratePage(Article, Locale, Generators, AvailablePages, AvailablePageSelector, Custom = "") {
    Output = ""
    Output += "<!DOCTYPE html>\n"
    Output += "<html lang=" + Localize(Locale, "locale_title") + ">\n"
    Output += "<head>\n"
    Output += Generators.Head.GenerateHead(Article, Locale) + "\n"
    Output += "</head>\n"
    Output += "<body class='DisableAntialiasing'>\n"
    Output += "<div class='EnableAntialiasing'>"
    Output += Generators.Header.GenerateHeader(Article, Locale, AvailablePageSelector == AvailablePages.Home) + "\n"
    Output += Generators.Body.GenerateBody(Article, Locale, AvailablePages, AvailablePageSelector, Custom) + "\n"
    Output += Generators.Footer.GenerateFooter(Article, Locale) + "\n"
    Output += "</div>"
    Output += "</body>\n"
    Output += "</html>"
    return Output
}

module.exports = { GeneratePage }