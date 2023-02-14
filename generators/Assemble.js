const { Localize } = require('./tools/LocaleTools')
const RequestInfo = require("../middleware/RequestBlocking")
const { Log } = require('../Log')
const Head = require('./Head')

const AvailablePages = {
    Home: Symbol("Home"),
    Dynamic: Symbol("Article"),
    R: Symbol("R"),
    NonstandardPages: ["R"]
}

let Cache = []
const GeneratePageCached = async function (req, Article, Locale, AvailablePages, AvailablePageSelector, Custom = "", Filename) {
    let ServeInfo = " (" + RequestInfo.RequestAnalytics.TotalRequestsServed + " served, " + RequestInfo.RequestAnalytics.TotalRequestsBlocked + " blocked)"
    let CacheObject = {
        A: Article,
        B: Locale,
        C: AvailablePageSelector,
        D: Custom,
        E: Filename
    }
    let Found = {};
    for (var x = 0; x < Cache.length; x++) {
        if (Cache[x].A == CacheObject.A) {
            if (Cache[x].B == CacheObject.B) {
                if (Cache[x].C == CacheObject.C) {
                    if (Cache[x].D == CacheObject.D) {
                        if (Cache[x].E == CacheObject.E) {
                            Found = Cache[x]
                        }
                    }
                }
            }
        }
    }
    if (Found.A == Article) {
        Log("Found page in cache: " + req.url + ServeInfo)
        return Found.F
    }
    else {
        CacheObject.F = GeneratePage(Article, Locale, AvailablePages, AvailablePageSelector, Custom, Filename);
        Cache.push(CacheObject)
        Log("Rendered page for cache: " + req.url + ServeInfo)
        return CacheObject.F
    }

}

function CreateTooltips() {
    let Output = "";
    Output += "<div class='TooltipContainer MobileHidden'>"
    Output += "<p id='TooltipText' class='TooltipText NoSelect' aria-hidden='true'>"
    Output += "</p>"
    Output += "</div>"
    Output += "<div class='TooltipContainer MobileHidden'>"
    Output += "<p id='TooltipText2' class='TooltipText TooltipTextSmall NoSelect' aria-hidden='true'>"
    Output += "</p>"
    Output += "</div>"
    return Output;
}
const GenerateBodyV2 = async function(Article2, Locale, AvailablePages, AvailablePageSelector, Custom, Filename) {
    return `
        <div class="Slide SlideVisible" id="Slide1" style="background-color: white"></div>
        <div class="Slide SlideContentVisible" id="SlideContent1">
            <div class="GradientContainer">
                <div class="Gr Gr-1"></div>
                <div class="Gr Gr-2"></div>
                <div class="Gr Gr-3"></div>
                <div class="Gr-Plus Gr-4"></div>
                <div class="Gr-Plus Gr-5"></div>
                <div class="Gr-Plus Gr-6"></div>
            </div>
            <div class="SlideInner" style="color: black">
                <p class="Author">Strayfade</p>
                <h1>Portfolio</h1>
                <p>Hello! I am Noah, a <rd data-tooltipsmall="Automatically Updates">17-year-old</rd> software developer (primarily <rd>web development</rd>) and <rd>musician</rd> from the <rd>United States</rd></p>
            </div>
        </div>
        <div class="Slide SlideNotViewed" id="Slide2" style="background-color: var(--accent-color)"></div>
        <div class="Slide SlideContentHidden" id="SlideContent2">
            <div class="GradientContainer">
                <div class="Gr-Plus Gr-7"></div>
                <div class="Gr-Plus Gr-8"></div>
            </div>
            <div class="SlideInner" style="color: white">
                <p class="Author">Experience</p>
                <h1>Projects</h1>
                <div class="Flexbox">
                    <div class="GridItem">
                        <h3>Web Development</h3>
                        <p>Full-stack web development building modern, dynamic interfaces and structured backend solutions.</p>
                        <div class="Icobox">
                            <a class="Coloring2" href="https://github.com/Strayfade/Website">Source Code</a>
                            <svg class="Icon Coloring2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 5 50 40"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
                        </div>
                    </div>
                    <div class="GridItem">
                        <h3>Game-hacking</h3>
                        <p>Reading/writing memory and creating user interfaces in C++ for cheat development for video games such as Fortnite.</p>
                    </div>
                </div>
                <div class="Flexbox">
                    <div class="GridItem">
                        <h3>Neural Networks/AI</h3>
                        <p>Created feed-forward neural network systems for task automation and experimentation.</p>
                    </div>
                    <div class="GridItem">
                        <h3>Auth</h3>
                        <p>Created multiple program authentication solutions for distributing paid software with license keys.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="Slide SlideNotViewed" id="Slide3" style="background-color: black"></div>
        <div class="Slide SlideContentHidden" id="SlideContent3">
            <div class="GradientContainer">
                <div class="Gr-Plus Gr-9"></div>
                <div class="Gr-Plus Gr-10"></div>
            </div>
            <div class="SlideInner" style="color: white">
                <p class="Author">Connect</p>
                <h1>Contact Me</h1>
                <p>You can send me an email at <a href="mailto:me@strayfade.com">me@strayfade.com</a> and I might read it, or you can shoot me a message on <a href="https://twitter.com/Strayfade">Twitter</a> or <a href="https://instagram.com/strayfade">Instagram</a></p>
            </div>
        </div>
        <div class="Header">
            <svg class="Icon Coloring1" onclick="UpdateSlides(0)" version="1.0" xmlns="http://www.w3.org/2000/svg" width="300.000000pt" height="300.000000pt" viewBox="0 0 300.000000 300.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)"><path d="M2707 5344 c-178 -217 -563 -686 -857 -1043 -609 -741 -676 -830 -786 -1052 -265 -529 -186 -1034 228 -1460 114 -117 678 -590 702 -588 9 1 372 434 806 964 1176 1433 1361 1655 1376 1655 73 0 193 -307 179 -459 -16 -176 -34 -201 -1014 -1389 -506 -615 -920 -1123 -920 -1130 2 -19 587 -490 606 -487 9 1 194 217 410 480 216 263 596 725 844 1027 679 823 798 1012 870 1376 103 514 -94 878 -779 1439 l-277 227 -46 -47 c-42 -43 -814 -980 -1749 -2122 -203 -249 -380 -453 -393 -454 -40 -2 -147 163 -180 276 -75 257 -63 276 863 1400 429 521 842 1022 917 1114 75 92 131 176 124 187 -17 28 -549 463 -577 472 -13 4 -169 -169 -347 -386z"></path></g></svg>
        </div>
        <div class="Sidebar SidebarRight" id="SidebarMain">
            <a href="https://github.com/Strayfade" data-tooltip="GitHub"><svg class="Icon Coloring1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg></a>
            <a href="https://github.com/Strayfade/Website" data-tooltip="Source Code"><svg class="Icon Coloring1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"></path></svg></a>
            <a href="https://twitter.com/Strayfade" data-tooltip="Twitter"><svg class="Icon Coloring1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a>
            <a href="https://youtube.com/Strayfade" data-tooltip="YouTube"><svg class="Icon Coloring1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg></a>
        </div>
        <div class="SidebarScrollPercentage">
            <div class="SidebarScrollFill"></div>
        </div>
        <div class="Footer">
            <h3>© Copyright 2023 Strayfade. All Rights Reserved.</h3>
        </div>
    `;
} 
const GeneratePage = async function (Article, Locale, AvailablePages, AvailablePageSelector, Custom = "", Filename = "_None.md") {
    let HeadStr = await Head.GenerateHead(Article, Locale)
    let BodyStr = await GenerateBodyV2(Article, Locale, AvailablePages, AvailablePageSelector, Custom, Filename)

    Output = `
        <!DOCTYPE html>
        <html lang="` + Localize(Locale, "locale_title") + `">
        <head>` + HeadStr + `</head>
        <body>
        <main>
        ` + BodyStr + `
        </main>
    ` + CreateTooltips() + `
        <script src="/Production.js"></script>
        </body>
        </html>
    `
    return Output
}

module.exports = { GeneratePageCached, GeneratePage, AvailablePages }