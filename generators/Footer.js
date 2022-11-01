const { Localize } = require('./tools/LocaleTools')

function GenerateFooter(Article, Locale) {

    Output = ""
    Output += "<footer>\n"
    Output += "<div class='Footer'>"
    Output += "<div class='FooterInner DisplayWidth'>"

    Output += "<div class='FooterObject MobileHidden'>"
    Output += "<a aria-label='" + Localize(Locale, "source_code") + "' class='LinkNormal Underline HoverAccentColor' href='https://github.com/Strayfade/Website'>" + Localize(Locale, "source_code") + "</a>"
    Output += "</div>"

    Output += "<div class='FooterObject FloatRight'>"
    Output += "<h1>" + Localize(Locale, "copyright_main") + "</h1>"
    Output += "</div>"

    Output += "<div class='FooterObject'>"
    Output += "<svg class='Icon NoSelect NoSpacing' version='1.0' xmlns='http://www.w3.org/2000/svg' width='300.000000pt' height='300.000000pt' viewBox='0 0 300.000000 300.000000' preserveAspectRatio='xMidYMid meet'>"
    Output += "<title>Strayfade Website Logo</title>"
    Output += "<g transform='translate(0.000000,300.000000) scale(0.050000,-0.050000)'>"
    Output += "<path d='M2707 5344 c-178 -217 -563 -686 -857 -1043 -609 -741 -676 -830 -786 -1052 -265 -529 -186 -1034 228 -1460 114 -117 678 -590 702 -588 9 1 372 434 806 964 1176 1433 1361 1655 1376 1655 73 0 193 -307 179 -459 -16 -176 -34 -201 -1014 -1389 -506 -615 -920 -1123 -920 -1130 2 -19 587 -490 606 -487 9 1 194 217 410 480 216 263 596 725 844 1027 679 823 798 1012 870 1376 103 514 -94 878 -779 1439 l-277 227 -46 -47 c-42 -43 -814 -980 -1749 -2122 -203 -249 -380 -453 -393 -454 -40 -2 -147 163 -180 276 -75 257 -63 276 863 1400 429 521 842 1022 917 1114 75 92 131 176 124 187 -17 28 -549 463 -577 472 -13 4 -169 -169 -347 -386z'/>"
    Output += "</g>"
    Output += "</svg>"
    Output += "</div>"

    Output += "</div>"
    Output += "</div>"
    Output += "</footer>\n"
    return Output
}

module.exports = { GenerateFooter }