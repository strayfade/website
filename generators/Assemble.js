const { Localize } = require('./tools/LocaleTools')
const { Log } = require('../Log')
const Head = require('./Head')
const Header = require('./Header')
const Body = require('./Body')
const Footer = require('./Footer')

let Cache = []
const GeneratePageCached = async function (req, Article, Locale, AvailablePages, AvailablePageSelector, Custom = "") {
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
        Log("Found page in cache: " + req.url)
        return Found.F
    }
    else {
        CacheObject.F = GeneratePage(Article, Locale, AvailablePages, AvailablePageSelector, Custom);
        Cache.push(CacheObject)
        Log("Rendered page for cache: " + req.url)
        return CacheObject.F
    }

}
const GeneratePage = async function (Article, Locale, AvailablePages, AvailablePageSelector, Custom = "") {
    let HeadStr = await Head.GenerateHead(Article, Locale)
    let HeaderStr = await Header.GenerateHeader(Article, Locale, AvailablePageSelector == AvailablePages.Home)
    let BodyStr = await Body.GenerateBody(Article, Locale, AvailablePages, AvailablePageSelector, Custom)
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
            <script src="/Production.js"></script>
            </body>
        </html>
    `
    return Output
}

module.exports = { GeneratePageCached }