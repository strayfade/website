const Body = async (Request, Inner) => {
    return `
    <body${(Request.cookies && Request.cookies.lightMode && (Request.cookies.lightMode == "true")) ? ` style="--foreground: var(--light);--background: var(--dark);"` : ``}>
        ${Inner}
        <script src="/prod.js"></script>
    </body>
    `
}
module.exports = { Body }