const { Localize } = require('./tools/LocaleTools')

function GenerateHeader(Article, Locale, isHomepage = false) {
    Output = ""
    Output += "<header>\n"
    Output += "<div class='Header'>"
    Output += "<div class='HeaderInner DisplayWidth Centered'>"

    Output += "<a class='LinkNormal' href='/'>"
    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<p class='Icon NoSelect NoSpacing'>S</p>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a class='LinkNormal' href='/'>"
    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<h1>" + Localize(Locale, "header_main") + "</h1>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a class='LinkNormal' href='/About'>"
    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<h1>" + Localize(Locale, "header_about") + "</h1>"
    Output += "</div>"
    Output += "</a>"

    Output += "<div id='LightModeToggleLight' class='HeaderObject HoverAccentColor CursorPointer Hidden' onclick='SetLightMode(!UseLightMode)'>"
    Output += "<i class='fa-solid fa-lightbulb HeaderSpecial'></i>"
    Output += "</div>"

    Output += "<div id='LightModeToggleDark' class='HeaderObject HoverAccentColor CursorPointer' onclick='SetLightMode(!UseLightMode)'>"
    Output += "<i class='fa-solid fa-moon HeaderSpecial'></i>"
    Output += "</div>"

    if (!isHomepage) {
        Output += "<a class='LinkNormal FloatRight' href='https://github.com/Strayfade'>"
    }
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden FloatRight'>"
    if (isHomepage) {
        Output += "<input id='PageSearchBox' type='text' placeholder='Search' oninput='SearchArticle()'>"
        Output += "</div>"
        Output += "<a class='LinkNormal' href='https://github.com/Strayfade'>"
        Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    }
    Output += "<i class='fa-brands fa-github HeaderSpecial'></i>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a class='LinkNormal' href='https://github.com/Strayfade/Website'>"
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += "<i class='fa-solid fa-code-branch HeaderSpecial'></i>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a class='LinkNormal' href='https://twitter.com/Strayfade'>"
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += "<i class='fa-brands fa-twitter HeaderSpecial'></i>"
    Output += "</div>"
    Output += "</a>"
    
    Output += "<a class='LinkNormal' href='https://youtube.com/Strayfade'>"
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += "<i class='fa-brands fa-youtube HeaderSpecial'></i>"
    Output += "</div>"
    Output += "</a>"

    Output += "</div>"
    Output += "</div>"
    Output += "</header>\n"
    return Output
}

module.exports = {GenerateHeader}