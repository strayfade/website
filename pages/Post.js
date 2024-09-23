const path = require('path')
const fs = require('fs').promises
const markdown = require('markdown')

const Rewrite = async (MarkdownHtml, isTex = false) => {
    MarkdownHtml = MarkdownHtml.trim()

    if (isTex) {
        MarkdownHtml = `<latex-js baseURL="https://cdn.jsdelivr.net/npm/latex.js/dist/">
        ${MarkdownHtml}
        </latex-js>`
    }
    else {
        let OutHTML = ""
        let InLaTeX = false
        let CurrentMarkdown = ""
        let Lines = MarkdownHtml.split("\n")
        for (let i = 0; i < Lines.length; i++) {
            if (Lines[i].includes("latex>")) {
                InLaTeX = !InLaTeX
                if (InLaTeX) {
                    OutHTML += `${markdown.parse(CurrentMarkdown)}\n`
                    OutHTML += `<latex-js baseURL="https://cdn.jsdelivr.net/npm/latex.js/dist/">`
                    CurrentMarkdown = ""
                }
                else {
                    OutHTML += `</latex-js>`
                }
            }
            else {
                if (InLaTeX) {
                    OutHTML += `${Lines[i]}\n`
                }
                if (!InLaTeX)
                    CurrentMarkdown += `${Lines[i]}\n`
            }
        }
        if (!InLaTeX)
            OutHTML += `${markdown.parse(CurrentMarkdown)}\n`
        MarkdownHtml = OutHTML

        for (let i = 0; i < MarkdownHtml.length; i++) {
            MarkdownHtml = MarkdownHtml.replace('&amp;lt;', '<')
            MarkdownHtml = MarkdownHtml.replace('&amp;gt;', '>')
            MarkdownHtml = MarkdownHtml.replace('&amp;quot;', '"')
            MarkdownHtml = MarkdownHtml.replace('&lt;', '<')
            MarkdownHtml = MarkdownHtml.replace('&gt;', '>')
            MarkdownHtml = MarkdownHtml.replace('&quot', '"')
            MarkdownHtml = MarkdownHtml.replace('&amp;', '&')
            MarkdownHtml = MarkdownHtml.replace('";', '"')
        }
    }

    return MarkdownHtml;
}

const HTML = require('../components/HTML').HTML
const Head = require('../components/Head').Head
const Body = require('../components/Body').Body
const Footer = require('../components/Footer').Footer
const BackButton = require('../components/BackButton').BackButton
const LightDarkToggle = require('../components/LightDarkToggle').LightDarkToggle

const { ConvertToEncrypted } = require('../components/EncryptedTextUtil')

const Post = async (Request, BuildData) => {
    let Failed = false
    let TargetExists = false
    const TargetPath = path.join(__dirname, `../posts${Request.path}.md`)
    try {
        await fs.stat(TargetPath)
        TargetExists = true
    } catch {
        Failed = true
    }

    let Content = "";
    let Meta = ""
    if (TargetExists) {
        try {
            const File = await fs.readFile(TargetPath, { encoding: 'utf-8' })
            Meta = JSON.parse(File.substring(0, File.indexOf('}')) + "}")
            Content = File.substring(File.indexOf("}") + 1)
        } catch {
            Failed = true
        }
    }

    if (Failed) {
        return null;
    } else {
        return `
        ${await HTML(Request)}
        ${await Head(Request, Meta.title.length > 0 ? Meta.title : path.basename(TargetPath).split(".")[0], Meta.description, BuildData)}
        ${await Body(
            Request,
            `
            ${await BackButton(Request)}
            <div>
                <div class="article-content${Meta.tex ? `` : ` content-width`}">
                    ${await (async () => {
                if (Meta.showTitle && !Meta.tex) {
                    return `
                                    <div class="post-meta">
                                        <h1 class="decrypt-text" decrypted="${Meta.title}">${ConvertToEncrypted(Meta.title)}</h1>
                                        <p class="decrypt-text post-description" decrypted="${Meta.description}">${ConvertToEncrypted(Meta.description)}</p>
                                        <p class="decrypt-text post-author" decrypted="${ConvertToEncrypted(`- ${Meta.author}`)}">${ConvertToEncrypted(`- ${Meta.author}`)}</p>
                                    </div>
                                    `
                }
                return ``
            })()}
                    ${await Rewrite(Content, Meta.tex)}
                </div>
            </div>
            ${Meta.showTitle ? await Footer(Request, `// By ${Meta.author}`, `Written ${Meta.date}`) : ``}
            ${await LightDarkToggle(Request)}
            `
        , BuildData)}
        `
    }
}
module.exports = { Post }
