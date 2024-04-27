const Body = async (Request, Inner) => {
    return `
    <body${(Request.cookies.lightMode == "true") ? ` style="--foreground: var(--light);--background: var(--dark);"` : ``}>
        ${Inner}
        <script src="/build/production.js"></script>
    </body>
    `
}
module.exports = { Body }