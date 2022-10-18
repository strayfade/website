const { Localize } = require('./tools/LocaleTools')

function GenerateFooter(Article, Locale) {

    Output = ""
    Output += "<footer>\n"
    Output += "<div class='Footer'>"
    Output += "<div class='FooterInner DisplayWidth'>"
    
    Output += "<div class='FooterObject MobileHidden'>"
    Output += "<a class='LinkNormal Underline HoverAccentColor' href='https://github.com/Strayfade/Website'>" + Localize(Locale, "source_code") + "</a>"
    Output += "</div>"

    Output += "<div class='FooterObject FloatRight'>"
    Output += "<h1>" + Localize(Locale, "copyright_main") + "</h1>"
    Output += "</div>"

    Output += "<div class='FooterObject'>"
    Output += "<p class='Icon NoSelect NoSpacing'>S</p>"
    Output += "</div>"

    Output += "</div>"
    Output += "</div>"
    Output += "</footer>\n"
    return Output
}

module.exports = { GenerateFooter }