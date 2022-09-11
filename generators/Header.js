function GenerateHeader(Article, Locale) {
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
    Output += "<div class='HeaderObject HoverAccentColor CursorPointer' onclick='SetLightMode(!UseLightMode)'>"
    Output += "<i id='LightModeToggle' class='fa-solid fa-sun HeaderSpecial'></i>"
    Output += "</div>"

    Output += "<div class='HeaderObject HoverAccentColor FloatRight CursorPointer' onclick='OpenURL(`https://github.com/Strayfade`)'>"
    Output += "<i class='fa-brands fa-github HeaderSpecial'></i>"
    Output += "</div>"
    Output += "<div class='HeaderObject HoverAccentColor CursorPointer' onclick='OpenURL(`https://github.com/Strayfade/Website`)'>"
    Output += "<i class='fa-solid fa-code-branch HeaderSpecial'></i>"
    Output += "</div>"
    Output += "<div class='HeaderObject HoverAccentColor CursorPointer' onclick='OpenURL(`https://twitter.com/Strayfade`)'>"
    Output += "<i class='fa-brands fa-twitter HeaderSpecial'></i>"
    Output += "</div>"
    Output += "<div class='HeaderObject HoverAccentColor CursorPointer' onclick='OpenURL(`https://youtube.com/Strayfade`)'>"
    Output += "<i class='fa-brands fa-youtube HeaderSpecial'></i>"
    Output += "</div>"

    Output += "</div>"
    Output += "</div>"
    Output += "</header>\n"
    return Output
}

module.exports = {GenerateHeader}