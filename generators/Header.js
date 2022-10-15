function GenerateHeader(Article, Locale, isHomepage = false) {
    Output = ""
    Output += "<header>\n"
    Output += "<div class='Header'>"
    Output += "<div class='HeaderInner DisplayWidth'>"

    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<p class='Icon NoSelect NoSpacing'><a class='LinkNormal' href='/'>S</a></p>"
    Output += "</div>"

    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<h1><a class='LinkNormal' href='/'>" + Locale.header_main + "</a></h1>"
    Output += "</div>"

    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<h1><a class='LinkNormal' href='/About'>" + Locale.header_about + "</a></h1>"
    Output += "</div>"

    Output += "<div id='LightModeToggleLight' class='HeaderObject HoverAccentColor CursorPointer Hidden' onclick='SetLightMode(!UseLightMode)'>"
    Output += "<i class='fa-solid fa-lightbulb HeaderSpecial'></i>"
    Output += "</div>"

    Output += "<div id='LightModeToggleDark' class='HeaderObject HoverAccentColor CursorPointer' onclick='SetLightMode(!UseLightMode)'>"
    Output += "<i class='fa-solid fa-moon HeaderSpecial'></i>"
    Output += "</div>"

    Output += "<div class='HeaderObject HoverAccentColor FloatRight MobileHidden'>"
    if (isHomepage) {
        Output += "<input id='PageSearchBox' type='text' placeholder='Search' oninput='SearchArticle()'>"
        Output += "</div>"
        Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    }
    Output += "<a class='LinkNormal' href='https://github.com/Strayfade'><i class='fa-brands fa-github HeaderSpecial'></i></a>"
    Output += "</div>"

    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += "<a class='LinkNormal' href='https://github.com/Strayfade/Website'><i class='fa-solid fa-code-branch HeaderSpecial'></i></a>"
    Output += "</div>"

    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += "<a class='LinkNormal' href='https://twitter.com/Strayfade'><i class='fa-brands fa-twitter HeaderSpecial'></i></a>"
    Output += "</div>"
    
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += "<a class='LinkNormal' href='https://youtube.com/Strayfade'><i class='fa-brands fa-youtube HeaderSpecial'></i></a>"
    Output += "</div>"

    Output += "</div>"
    Output += "</div>"
    Output += "</header>\n"
    return Output
}

module.exports = {GenerateHeader}