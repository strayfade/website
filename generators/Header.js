function GenerateHeader(Article, Locale, isHomepage = false) {
    Output = ""
    Output += "<header>\n"
    Output += "<div class='Header'>"
    Output += "<div class='HeaderInner DisplayWidth'>"

    Output += "<div class='HeaderObject HoverAccentColor CursorPointer' onclick='OpenURL(`/`)'>"
    Output += "<p class='Icon NoSelect NoSpacing'>S</p>"
    Output += "</div>"
    Output += "<div class='HeaderObject HoverAccentColor CursorPointer' onclick='OpenURL(`/`)'>"
    Output += "<h1>" + Locale.header_main + "</h1>"
    Output += "</div>"
    Output += "<div id='LightModeToggleLight' class='HeaderObject HoverAccentColor CursorPointer Hidden' onclick='SetLightMode(!UseLightMode)'>"
    Output += "<i class='fa-solid fa-lightbulb HeaderSpecial'></i>"
    Output += "</div>"
    Output += "<div id='LightModeToggleDark' class='HeaderObject HoverAccentColor CursorPointer' onclick='SetLightMode(!UseLightMode)'>"
    Output += "<i class='fa-solid fa-moon HeaderSpecial'></i>"
    Output += "</div>"

    Output += "<div class='HeaderObject HoverAccentColor FloatRight CursorPointer'>"
    if (isHomepage) {
        Output += "<input id='PageSearchBox' type='text' placeholder='Search' oninput='SearchArticle()'>"
        Output += "</div>"
        Output += "<div class='HeaderObject HoverAccentColor CursorPointer MobileHidden' onclick='OpenURL(`https://github.com/Strayfade`)'>"
    }

    Output += "<i class='fa-brands fa-github HeaderSpecial'></i>"
    Output += "</div>"
    Output += "<div class='HeaderObject HoverAccentColor CursorPointer MobileHidden' onclick='OpenURL(`https://github.com/Strayfade/Website`)'>"
    Output += "<i class='fa-solid fa-code-branch HeaderSpecial'></i>"
    Output += "</div>"
    Output += "<div class='HeaderObject HoverAccentColor CursorPointer MobileHidden' onclick='OpenURL(`https://twitter.com/Strayfade`)'>"
    Output += "<i class='fa-brands fa-twitter HeaderSpecial'></i>"
    Output += "</div>"
    Output += "<div class='HeaderObject HoverAccentColor CursorPointer MobileHidden' onclick='OpenURL(`https://youtube.com/Strayfade`)'>"
    Output += "<i class='fa-brands fa-youtube HeaderSpecial'></i>"
    Output += "</div>"

    Output += "</div>"
    Output += "</div>"
    Output += "</header>\n"
    return Output
}

module.exports = {GenerateHeader}