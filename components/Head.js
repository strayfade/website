const UseIcon = true;
const Head = async (Request, Title, Description, BuildData) => {
    return `
    <head>
        <meta charset="utf-8">
        <meta name="referrer" content="no-referrer">

        <meta property="og:site_name" content="strayfade.com">
        <meta property="og:url" content="strayfade.com">
        <meta name="twitter:url" content="strayfade.com">

        <title>HEADHUNTER</title>
        <meta property="og:title" content="HEADHUNTER">
        <meta property="twitter:title" content="HEADHUNTER">

        <meta name="description" content="${Description}">
        <meta property="og:description" content="${Description}">
        <meta property="twitter:description" content="${Description}">

        <meta name="author" content="Strayfade">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#f0f0f0">
        ${UseIcon ? `
            <link rel="icon" href="/assets/Icon.svg" color="#ffffff">
            <link rel="mask-icon" href="/assets/Icon.svg" color="#ffffff">
        ` : ``}
        
        <link rel="dns-prefetch" href="https://strayfade.com">
        
        <style>
        ${BuildData.stylesheet}
        </style>
    </head>
    `
}
module.exports = { Head }