const Head = async (Request, Title, Description) => {
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

        <link rel="stylesheet" href="/prod.css" type="text/css">
        <link rel="preload" href="/prod.js" as="script">
        ${Request.path != "/" ? `
            
        <script type="module">
            import { LaTeXJSComponent } from "https://cdn.jsdelivr.net/npm/latex.js/dist/latex.mjs"
            customElements.define("latex-js", LaTeXJSComponent)
        </script>
        
        ` : ``}
    </head>
    `
}
module.exports = { Head }