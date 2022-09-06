function GeneratePage(Article, Locale, Generators, isHomepage = false, Custom = "") {
    Output = ""
    Output += "<!DOCTYPE html>\n"
    Output += "<html>\n"
    Output += "<head>\n"
    Output += Generators.Head.GenerateHead(Article, Locale) + "\n"
    Output += "</head>\n"
    Output += "<body>\n"
    Output += Generators.Header.GenerateHeader(Article, Locale) + "\n"
    Output += Generators.Body.GenerateBody(Article, Locale, isHomepage, Custom) + "\n"
    Output += Generators.Footer.GenerateFooter(Article, Locale) + "\n"
    Output += "</body>\n"
    Output += "</html>"
    return Output
}

module.exports = { GeneratePage }