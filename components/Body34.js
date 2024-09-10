const Body34 = async (Request, Inner) => {
    return `
    <body style="--foreground: var(--dark); --background: #aae5a4; --font-family: verdana, sans-serif;">
        ${Inner}
        <script src="/prod.js"></script>
    </body>
    `
}
module.exports = { Body34 }