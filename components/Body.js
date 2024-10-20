const Body = async (Request, Inner, BuildData) => {
    return `
        <body style="overflow: hidden;">
            ${Inner}
            <script>
            ${BuildData.script}
            </script>
        </body>
        `
}
module.exports = { Body }