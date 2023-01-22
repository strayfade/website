const { Localize } = require('./tools/LocaleTools')

function GeneratePage(Article, Locale, Generators, AvailablePages, AvailablePageSelector, Custom = "") {
    Output = `
        <!DOCTYPE html>
        <html lang="` + Localize(Locale, "locale_title") + `">
            <head>` + Generators.Head.GenerateHead(Article, Locale) + `</head>
            <body class="DisableAntialiasing">
                <main class="EnableAntialiasing">
                    ` + Generators.Header.GenerateHeader(Article, Locale, AvailablePageSelector == AvailablePages.Home) + `
                    ` + Generators.Body.GenerateBody(Article, Locale, AvailablePages, AvailablePageSelector, Custom) + `
                    ` + Generators.Footer.GenerateFooter(Article, Locale) + `
                </main>
            <script src="/Production.js"></script>
            </body>
        </html>
    `
    return Output
}

module.exports = { GeneratePage }