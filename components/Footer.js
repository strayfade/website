const Footer = async (Request, Author = "// ", LastEdited = "") => {
    return `
    <footer>
        <p class="footer-top decrypt-text">${Author}</p>
        <p class="footer-bottom decrypt-text">${LastEdited}</p>
    </footer>
    `
}
module.exports = { Footer }