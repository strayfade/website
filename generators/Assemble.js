function GeneratePage(Article, Locale, Generators, AvailablePages, AvailablePageSelector, Custom = "", Flag = " ") {
    Output = ""
    Output += "<!DOCTYPE html>\n"
    Output += "<html lang=" + Locale.short_locale_title + ">\n"
    Output += "<head>\n"
    Output += Generators.Head.GenerateHead(Article, Locale) + "\n"
    Output += "</head>\n"
    Output += "<body>\n"
    Output += Generators.Header.GenerateHeader(Article, Locale, AvailablePageSelector == AvailablePages.Home) + "\n"
    Output += Generators.Body.GenerateBody(Article, Locale, AvailablePageSelector == AvailablePages.Home, Custom) + "\n"
    Output += Generators.Footer.GenerateFooter(Article, Locale, Flag) + "\n"
    Output += "</body>\n"
    Output += "</html>"
    return Output
}

module.exports = { GeneratePage }