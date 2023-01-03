const { Localize } = require('./tools/LocaleTools')

function GenerateHeader(Article, Locale, isHomepage = false) {
    Output = ""
    Output += "<header>\n"
    Output += "<div class='Header'>"
    Output += "<div class='HeaderInner DisplayWidth Centered'>"

    Output += "<a aria-label='" + Localize(Locale, "header_main") + "' class='LinkNormal' href='/' data-tooltip='" + Localize(Locale, "header_main") + "'>"
    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<svg class='Icon NoSelect NoSpacing' version='1.0' xmlns='http://www.w3.org/2000/svg' width='300.000000pt' height='300.000000pt' viewBox='0 0 300.000000 300.000000' preserveAspectRatio='xMidYMid meet'>"
    Output += "<title>Strayfade Website Logo</title>"
    Output += "<g transform='translate(0.000000,300.000000) scale(0.050000,-0.050000)'>"
    Output += "<path d='M2707 5344 c-178 -217 -563 -686 -857 -1043 -609 -741 -676 -830 -786 -1052 -265 -529 -186 -1034 228 -1460 114 -117 678 -590 702 -588 9 1 372 434 806 964 1176 1433 1361 1655 1376 1655 73 0 193 -307 179 -459 -16 -176 -34 -201 -1014 -1389 -506 -615 -920 -1123 -920 -1130 2 -19 587 -490 606 -487 9 1 194 217 410 480 216 263 596 725 844 1027 679 823 798 1012 870 1376 103 514 -94 878 -779 1439 l-277 227 -46 -47 c-42 -43 -814 -980 -1749 -2122 -203 -249 -380 -453 -393 -454 -40 -2 -147 163 -180 276 -75 257 -63 276 863 1400 429 521 842 1022 917 1114 75 92 131 176 124 187 -17 28 -549 463 -577 472 -13 4 -169 -169 -347 -386z'/>"
    Output += "</g>"
    Output += "</svg>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a aria-label='" + Localize(Locale, "header_main") + "' class='LinkNormal' href='/'>"
    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<h1>" + Localize(Locale, "header_main") + "</h1>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a aria-label='" + Localize(Locale, "header_shop") + "' class='LinkNormal' href='/Shop'>"
    Output += "<div class='HeaderObject HoverAccentColor'>"
    Output += "<h1>" + Localize(Locale, "header_shop") + "</h1>"
    Output += "</div>"
    Output += "</a>"

    Output += "<div tabindex='0' onclick='SetLightMode(!UseLightMode)'>"
    Output += "<div id='LightModeToggleLight' class='HeaderObject HoverAccentColor CursorPointer Hidden' data-tooltip='" + Localize(Locale, "tooltip_darkmode") + "'>"
    Output += `<svg class="HeaderSpecial" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"></path></svg>`
    Output += "</div>"

    Output += "<div id='LightModeToggleDark' class='HeaderObject HoverAccentColor CursorPointer' data-tooltip='" + Localize(Locale, "tooltip_lightmode") + "'>"
    Output += `<svg class="HeaderSpecial" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg>`
    Output += "</div>"
    Output += "</div>"

    if (!isHomepage) {
        Output += "<a aria-label='GitHub' class='LinkNormal FloatRight' href='https://github.com/Strayfade' data-tooltip='GitHub'>"
    }
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden FloatRight' data-tooltip='Search Articles'>"
    if (isHomepage) {
        Output += "<input id='PageSearchBox' type='text' placeholder='Search' oninput='SearchArticle()'>"
        Output += "</div>"
        Output += "<a aria-label='GitHub' class='LinkNormal' href='https://github.com/Strayfade' data-tooltip='GitHub'>"
        Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    }
    Output += `<svg class="HeaderSpecial" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>`
    Output += "</div>"
    Output += "</a>"

    Output += "<a aria-label='" + Localize(Locale, "source_code") + "' class='LinkNormal' href='https://github.com/Strayfade/Website' data-tooltip='" + Localize(Locale, "source_code") + "'>"
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += `<svg class="HeaderSpecial" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"></path></svg>`
    Output += "</div>"
    Output += "</a>"

    Output += "<a aria-label='Twitter' class='LinkNormal' href='https://twitter.com/Strayfade' data-tooltip='Twitter'>"
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += `<svg class="HeaderSpecial" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>`
    Output += "</div>"
    Output += "</a>"

    Output += "<a aria-label='YouTube' class='LinkNormal' href='https://youtube.com/Strayfade' data-tooltip='YouTube'>"
    Output += "<div class='HeaderObject HoverAccentColor MobileHidden'>"
    Output += `<svg class="HeaderSpecial" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>`
    Output += "</div>"
    Output += "</a>"

    Output += "</div>"
    Output += "</div>"
    Output += "</header>\n"
    return Output
}

module.exports = { GenerateHeader }