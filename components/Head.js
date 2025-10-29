const UseIcon = true;
const Head = async (Request, Title, Description, BuildData) => {
    return `
    <head>
        <link rel="manifest" href="/assets/manifest.json">
        <meta charset="utf-8">
        <meta name="referrer" content="no-referrer">

        <meta property="og:site_name" content="strayfade.com">
        <meta property="og:url" content="strayfade.com">
        <meta name="twitter:url" content="strayfade.com">

        <title>${Title} | strayfade</title>
        <meta property="og:title" content="${Title} | strayfade">
        <meta property="twitter:title" content="${Title} | strayfade">

        <meta name="description" content="${Description}">
        <meta property="og:description" content="${Description}">
        <meta property="twitter:description" content="${Description}">

        <meta name="author" content="strayfade">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#f0f0f0">
        ${UseIcon ? `
            <link rel="icon" href="/assets/Icon.svg" color="#ffffff">
            <link rel="mask-icon" href="/assets/Icon.svg" color="#ffffff">
        ` : ``}

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        
        <link rel="dns-prefetch" href="https://strayfade.com">
        
        <style>
        ${BuildData.stylesheet}
        </style>
    </head>
    `
}
module.exports = { Head }