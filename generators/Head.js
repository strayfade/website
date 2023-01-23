const { Localize } = require('./tools/LocaleTools')

function GenerateHead(Article, Locale) {
    Output = `
        <link rel="manifest" href="/assets/manifest.json">
        <meta charset="utf-8">
    `

    let SiteTitle = Article.title + Localize(Locale, "site_title_extension")
    if (Article.title == "") {
        SiteTitle = Localize(Locale, "site_title_default")
    }

    Output += `
        <meta property="og:site_name" content="` + Localize(Locale, "site_name") + `">
        <meta property="og:url" content="` + Localize(Locale, "site_name") + `">
        <meta name="twitter:url" content="` + Localize(Locale, "site_name") + `">

        <title>` + SiteTitle + `</title>
        <meta property="og:title" content="` + SiteTitle + `">
        <meta property="twitter:title" content="` + SiteTitle + `">

        <meta name="description" content="` + Article.description + `">
        <meta property="og:description" content="` + Article.description + `">
        <meta property="twitter:description" content="` + Article.description + `">

        <meta name="author" content="` + Article.author + `">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <meta name="theme-color" content="#f0f0f0">
        <link rel="icon" href="/assets/Icon.svg" color="#ffffff">
        <link rel="mask-icon" href="/assets/Icon.svg" color="#ffffff">

        <link rel="stylesheet" href="/Production.css" type="text/css">
        <link rel="preload" href="/Production.js" as="script">
    `
    return Output
}

module.exports = { GenerateHead }