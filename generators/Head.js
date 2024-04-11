const { Localize } = require('./tools/LocaleTools')
const fs = require('fs/promises')
const fsdir = require('fs')

const GenerateHead = async (Article, Locale) => {
    Article = JSON.parse(Article.split('}')[0] + '}')
    Output = `
        <link rel="manifest" href="/assets/manifest.json">
        <meta charset="utf-8">
        <meta name="referrer" content="no-referrer">
    `

    let SiteTitle = Article.title + Localize(Locale, 'site_title_extension')
    if (Article.title == '') {
        SiteTitle = Localize(Locale, 'site_title_default')
    }

    Output +=
        `
        <meta property="og:site_name" content="` +
        Localize(Locale, 'site_name') +
        `">
        <meta property="og:url" content="` +
        Localize(Locale, 'site_name') +
        `">
        <meta name="twitter:url" content="` +
        Localize(Locale, 'site_name') +
        `">

        <title>` +
        SiteTitle +
        `</title>
        <meta property="og:title" content="` +
        SiteTitle +
        `">
        <meta property="twitter:title" content="` +
        SiteTitle +
        `">

        <meta name="description" content="` +
        Article.description +
        `">
        <meta property="og:description" content="` +
        Article.description +
        `">
        <meta property="twitter:description" content="` +
        Article.description +
        `">

        <meta name="author" content="` +
        Article.author +
        `">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <meta name="theme-color" content="#f0f0f0">
        <link rel="icon" href="/assets/Icon.svg" color="#ffffff">
        <link rel="mask-icon" href="/assets/Icon.svg" color="#ffffff">
        <link rel="dns-prefetch" href="https://strayfade.com">
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';"">

        <link rel="stylesheet" href="/build/production.css" type="text/css">
        <link rel="preload" href="/build/production.js" as="script">
    `
    return Output
}

module.exports = { GenerateHead }
