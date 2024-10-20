const Body = async (Request, Inner, BuildData) => {
    return `
        <body>
            ${Inner}
            <script>
            ${BuildData.script}
            </script>
        </body>
        `
}
module.exports = { Body }