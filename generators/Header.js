const { Localize } = require('./tools/LocaleTools')

function GenerateHeader(Article, Locale, isHomepage = false) {
    Output = ""
    Output += "<header>\n"
    Output += "<div class='Header'>"
    Output += "<div class='HeaderInner DisplayWidth Centered'>"

    Output += "<a class='LinkNormal' href='/' data-tooltip='Home'>"
    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<svg class='Icon NoSelect NoSpacing' version='1.0' xmlns='http://www.w3.org/2000/svg' width='300.000000pt' height='300.000000pt' viewBox='0 0 300.000000 300.000000' preserveAspectRatio='xMidYMid meet'>"
    Output += "<g transform='translate(0.000000,300.000000) scale(0.050000,-0.050000)'>"
    Output += "<path d='M2707 5344 c-178 -217 -563 -686 -857 -1043 -609 -741 -676 -830 -786 -1052 -265 -529 -186 -1034 228 -1460 114 -117 678 -590 702 -588 9 1 372 434 806 964 1176 1433 1361 1655 1376 1655 73 0 193 -307 179 -459 -16 -176 -34 -201 -1014 -1389 -506 -615 -920 -1123 -920 -1130 2 -19 587 -490 606 -487 9 1 194 217 410 480 216 263 596 725 844 1027 679 823 798 1012 870 1376 103 514 -94 878 -779 1439 l-277 227 -46 -47 c-42 -43 -814 -980 -1749 -2122 -203 -249 -380 -453 -393 -454 -40 -2 -147 163 -180 276 -75 257 -63 276 863 1400 429 521 842 1022 917 1114 75 92 131 176 124 187 -17 28 -549 463 -577 472 -13 4 -169 -169 -347 -386z'/>"
    Output += "</g>"
    Output += "</svg>"
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

    Output += "<div id='LightModeToggleLight' class='HeaderObject HoverAccentColor CursorPointer Hidden' onclick='SetLightMode(!UseLightMode)' data-tooltip='Dark Mode'>"
    Output += "<i class='fa-solid fa-lightbulb HeaderSpecial'></i>"
    Output += "</div>"

    Output += "<div id='LightModeToggleDark' class='HeaderObject HoverAccentColor CursorPointer' onclick='SetLightMode(!UseLightMode)' data-tooltip='Light Mode'>"
    Output += "<i class='fa-solid fa-moon HeaderSpecial'></i>"
    Output += "</div>"

    if (!isHomepage) {
        Output += "<a class='LinkNormal FloatRight' href='https://github.com/Strayfade' data-tooltip='GitHub'>"
    }
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden FloatRight'>"
    if (isHomepage) {
        Output += "<input id='PageSearchBox' type='text' placeholder='Search' oninput='SearchArticle()'>"
        Output += "</div>"
        Output += "<a class='LinkNormal' href='https://github.com/Strayfade' data-tooltip='GitHub'>"
        Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    }
    Output += "<i class='fa-brands fa-github HeaderSpecial'></i>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a class='LinkNormal' href='https://github.com/Strayfade/Website' data-tooltip='Source Code'>"
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += "<i class='fa-solid fa-code-branch HeaderSpecial'></i>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a class='LinkNormal' href='https://twitter.com/Strayfade' data-tooltip='Twitter'>"
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += "<i class='fa-brands fa-twitter HeaderSpecial'></i>"
    Output += "</div>"
    Output += "</a>"
    
    Output += "<a class='LinkNormal' href='https://youtube.com/Strayfade' data-tooltip='YouTube'>"
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