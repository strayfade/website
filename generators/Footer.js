function GenerateFooter(Article, Locale, Flag) {

    Output = ""
    Output += "<footer>\n"
    Output += "<div class='Footer'>"
    Output += "<div class='FooterInner DisplayWidth'>"

    Output += "<div class='FooterObject'>"
    Output += "<p>" + Flag + "</p>"
    Output += "</div>"
    
    Output += "<div class='FooterObject FloatRight'>"
    Output += "<h1>" + Locale.copyright_main + "</h1>"
    Output += "</div>"
    Output += "<div class='FooterObject'>"
    Output += "<p class='Icon NoSelect NoSpacing'>S</p>"
    Output += "</div>"
    
    Output += "</div>"
    Output += "</div>"
    Output += "</footer>\n"
    return Output
}

module.exports = {GenerateFooter}