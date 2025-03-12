const { cacheFunc } = require("../Cache")

const Body = async (Request, Inner, BuildData) => {
    const InnerFn = () => {
        return `
        <body>
            ${Inner}
        </body>
        `
    }
    return cacheFunc(InnerFn, {
        path: Request.path
    })
}
module.exports = { Body }