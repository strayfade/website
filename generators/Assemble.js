const { Localize } = require('./tools/LocaleTools')
const RequestInfo = require("../middleware/RequestBlocking")
const { Log } = require('../Log')
const Head = require('./Head')
const Header = require('./Header')
const Body = require('./Body')
const Footer = require('./Footer')

let Cache = []
const GeneratePageCached = async function (req, Article, Locale, AvailablePages, AvailablePageSelector, Custom = "", Filename) {
    let ServeInfo = " (" + RequestInfo.RequestAnalytics.TotalRequestsServed + " served, " + RequestInfo.RequestAnalytics.TotalRequestsBlocked + " blocked)"
    let CacheObject = {
        A: Article,
        B: Locale,
        C: AvailablePages,
        D: AvailablePageSelector,
        E: Custom
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
const GeneratePage = async function (Article, Locale, AvailablePages, AvailablePageSelector, Custom = "", Filename = "_None.md") {
    let HeadStr = await Head.GenerateHead(Article, Locale)
    let HeaderStr = await Header.GenerateHeader(Article, Locale, AvailablePageSelector == AvailablePages.Home)
    let BodyStr = await Body.GenerateBody(Article, Locale, AvailablePages, AvailablePageSelector, Custom, Filename)
    let FooterStr = await Footer.GenerateFooter(Article, Locale)

    Output = `
        <!DOCTYPE html>
        <html lang="` + Localize(Locale, "locale_title") + `">
        <head>` + HeadStr + `</head>
        <body class="DisableAntialiasing">
        <main class="EnableAntialiasing">
        ` + HeaderStr + `
        ` + BodyStr + `
        ` + FooterStr + `
        </main>
    ` + CreateTooltips() + `
        <script src="/Production.js"></script>
        </body>
        </html>
    `
    return Output
}

module.exports = { GeneratePageCached }