const Head = async(Request, Title, Description) => {
    return `
    <head>
        <link rel="manifest" href="/assets/manifest.json">
        <meta charset="utf-8">
        <meta name="referrer" content="no-referrer">

        <meta property="og:site_name" content="strayfade.com">
        <meta property="og:url" content="strayfade.com">
        <meta name="twitter:url" content="strayfade.com">

        <title>${Title} | strayfade</title>
        <meta property="og:title" content="${Title} | Strayfade">
        <meta property="twitter:title" content="${Title} | Strayfade">

        <meta name="description" content="${Description}">
        <meta property="og:description" content="${Description}">
        <meta property="twitter:description" content="${Description}">

        <meta name="author" content="Strayfade">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#f0f0f0">
        <link rel="icon" href="/assets/Icon.svg" color="#ffffff">
        <link rel="mask-icon" href="/assets/Icon.svg" color="#ffffff">
        <link rel="dns-prefetch" href="https://strayfade.com">
        <meta http-equiv="Content-Security-Policy" content="base-uri 'self'; default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; img-src 'self'; media-src 'none'; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; worker-src 'none'; frame-src 'none'; form-action 'none';">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Noto+Serif" rel="stylesheet">

        <link rel="stylesheet" href="/build/production.css" type="text/css">
        <link rel="preload" href="/build/production.js" as="script">
    </head>
    `
}
module.exports = { Head }