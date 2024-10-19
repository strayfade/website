const { cacheFunc } = require("../Cache")

const Body = async (Request, Inner, BuildData) => {
    const InnerFn = (Cookies) => {
        return `
        <body${(Cookies && Cookies.lightMode && (Cookies.lightMode == "true")) ? ` style="--foreground: var(--light);--background: var(--dark);"` : ``}>
            ${Inner}
            <script>
            ${BuildData.script}
            </script>
        </body>
        `
    }
    return cacheFunc(InnerFn, {
        cookies: Request.cookies, 
        path: Request.path
    })
}
module.exports = { Body }