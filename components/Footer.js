const { ConvertToEncrypted, GenDecryptText } = require('../components/EncryptedTextUtil')

const Footer = async (Request, Author = "// by strayfade", LastEdited = "") => {
    return `
    <footer style="${Request.path == "/" ? "width: 100vw;" : ""}">
        <div>
            ${GenDecryptText("p", Author, "footer-top")}
            ${/*GenDecryptText("p", LastEdited, "footer-bottom")*/""}
            <div class="social-container">
                <a href="https://github.com/strayfade">
                    ${GenDecryptText("span", "Github", "footer-link")}
                </a>
                <a href="https://open.spotify.com/artist/11sY1toC4XScZvVWw2BBCw">
                    ${GenDecryptText("span", "Spotify", "footer-link")}
                </a>
                <a href="https://youtube.com/strayfade">
                    ${GenDecryptText("span", "YouTube", "footer-link")}
                </a>
                <a href="https://instagram.com/strayfade">
                    ${GenDecryptText("span", "Instagram", "footer-link")}
                </a>
            </div>
        </div>
    </footer>
    `
}
module.exports = { Footer }