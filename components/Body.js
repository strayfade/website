const Body = async (Request, Inner, BuildData) => {
    return `
    <body${(Request.cookies && Request.cookies.lightMode && (Request.cookies.lightMode == "true")) ? ` style="--foreground: var(--light);--background: var(--dark);"` : ``}>
        <noscript>    
            <div class="banner">
                You need Javascript enabled to use this webpage!
            </div>
        </noscript>
        ${Inner}
        <script>
        ${BuildData.script}
        </script>
    </body>
    `
}
module.exports = { Body }