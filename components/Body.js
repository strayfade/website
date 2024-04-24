const Body = async (Request, Inner) => {
    return `
    <body>
        ${Inner}
        <script src="/build/production.js"></script>
    </body>
    `
}
module.exports = { Body }