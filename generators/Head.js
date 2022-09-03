function GenerateHead(Article, Locale) {
    Output = ""

    let SiteTitle = Article.title + Locale.site_title_extension
    if (Article.title == "") {
        SiteTitle = Locale.site_title_default
    }
    // Site Name/URL Tags
    Output += "<meta property='og:site_name' content='" + Locale.site_name + "'>"
    Output += "<meta property='og:url' content='" + Locale.site_name + "'>"
    Output += "<meta name='twitter:url' content='" + Locale.site_name + "'>"

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
    Output += "<link rel='shortcut icon' href='/assets/Icon.png' type='image/x-icon'>"

    // Font Imports
    Output += "<link rel='stylesheet' href='/fonts/Rajdhani/Rajdhani.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/fonts/Xirod/Xirod.css' type='text/css'>"

    // Stylesheet Imports
    Output += "<link rel='stylesheet' href='/css/Default.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/Colors.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/Markdown.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/NoSelect.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/NoSpacing.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/OnHover.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/Header.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/Footer.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/Cursor.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/Layout.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/Logo.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/Article.css' type='text/css'>"
    Output += "<link rel='stylesheet' href='/css/Effects.css' type='text/css'>"

    // FontAwesome Icons
    Output += "<script src='https://kit.fontawesome.com/7ac1d98129.js' crossorigin='anonymous'></script>"

    // Markdown Tools
    Output += "<script type='module' src='https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js'></script>"

    // Appearance Scripts
    Output += "<script src='/scripts/Appear.js'></script>"

    // URL Redirecting Tools
    Output += "<script src='/scripts/URL.js'></script>"
    return Output
}

module.exports = { GenerateHead }