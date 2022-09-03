function GeneratePage(Article, Locale, Generators) {
    Output = ""
    Output += "<!DOCTYPE html>\n"
    Output += "<html>\n"
    Output += "<head>\n"
    Output += Generators.Head.GenerateHead(Article, Locale) + "\n"
    Output += "</head>\n"
    Output += "<body>\n"
    Output += Generators.Header.GenerateHeader(Article, Locale) + "\n"
    Output += Generators.Body.GenerateArticleBody(Article, Locale) + "\n"
    Output += Generators.Footer.GenerateFooter(Article, Locale) + "\n"
    Output += "</body>\n"
    Output += "</html>"
    return Output
}

module.exports = { GeneratePage }