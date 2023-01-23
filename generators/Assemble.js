const { Localize } = require('./tools/LocaleTools')
const Head = require('./Head')
const Header = require('./Header')
const Body = require('./Body')
const Footer = require('./Footer')

async function GeneratePage(Article, Locale, AvailablePages, AvailablePageSelector, Custom = "") {
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

module.exports = { GeneratePage }