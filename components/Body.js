const Body = async (Request, Inner, BuildData) => {
    return `
    <body${(Request.cookies && Request.cookies.lightMode && (Request.cookies.lightMode == "true")) ? ` style="--foreground: var(--light);--background: var(--dark);"` : ``}>
        ${Inner}
        <script>
        ${BuildData.script}
        </script>
    </body>
    `
}
module.exports = { Body }