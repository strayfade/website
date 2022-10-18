const { Localize } = require('./tools/LocaleTools')

function GenerateHead(Article, Locale) {
    Output = ""
    Output += "<link rel='manifest' href='/manifest/manifest.json'>"
    Output += "<meta charset='utf-8'>"

    let SiteTitle = Article.title + Localize(Locale, "site_title_extension")
    if (Article.title == "") {
        SiteTitle = Localize(Locale, "site_title_default")
    }
    // Site Name/URL Tags
    Output += "<meta property='og:site_name' content='" + Localize(Locale, "site_name") + "'>"
    Output += "<meta property='og:url' content='" + Localize(Locale, "site_name") + "'>"
    Output += "<meta name='twitter:url' content='" + Localize(Locale, "site_name") + "'>"

    // Title Tags
    Output += "<title>" + SiteTitle + "</title>"
    Output += "<meta property='og:title' content='" + SiteTitle + "'>"
    Output += "<meta property='twitter:title' content='" + SiteTitle + "'>"

    // Description Tags
    Output += "<meta property='og:description' content='" + Article.description + "'>"
    Output += "<meta property='twitter:description' content='" + Article.description + "'>"

    // Author Tags
    Output += "<meta name='author' content='" + Article.author + "'>"

    // Viewport Tags
    Output += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"

    // Favicon
    Output += "<meta name='theme-color' content='#f0f0f0'>"
    Output += "<link rel='icon' href='/assets/Icon.svg' color='#ffffff>"
    Output += "<link rel='mask-icon' href='/assets/Icon.svg' color='#ffffff'>"

    // Imports
    Output += "<link rel='stylesheet' href='/Production.css' type='text/css'>"
    Output += "<script src='/Production.js'></script>"

    return Output
}

module.exports = { GenerateHead }