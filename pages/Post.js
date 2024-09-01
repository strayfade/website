const path = require('path')
const fs = require('fs').promises
const markdown = require('markdown')
const katex = require('katex')

const RewriteMarkdown = async (MarkdownHtml) => {
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

    let InLatex = false;
    let CurrentLatex = ""
    for (let i = 0; i < MarkdownHtml.length; i++) {
        if (MarkdownHtml[i] + MarkdownHtml[i + 1] == "$$") {
            InLatex = !InLatex;
            if (!InLatex) {
                CurrentLatex = CurrentLatex.substring(2)
                MarkdownHtml = MarkdownHtml.replace(`$$${CurrentLatex}$$`, katex.renderToString(CurrentLatex))
                CurrentLatex = "";
            }
        }
        if (InLatex)
            CurrentLatex += MarkdownHtml[i]
    }

    return MarkdownHtml;
}

const HTML = require('../components/HTML').HTML
const Head = require('../components/Head').Head
const Body = require('../components/Body').Body
const Footer = require('../components/Footer').Footer
const BackButton = require('../components/BackButton').BackButton
const LightDarkToggle = require('../components/LightDarkToggle').LightDarkToggle

const Post = async (Request) => {
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
        ${await Head(Request, Meta.title.length > 0 ? Meta.title : path.basename(TargetPath).split(".")[0], Meta.description)}
        ${await Body(
            Request,
            `
            ${await BackButton(Request)}
            <div class="content-scrollable">
                <div class="content-width article-content" style="margin: 0px auto;">
                    ${await (async () => {
                if (Meta.showTitle) {
                    return `
                            <div class="post-meta">
                                <h1 class="decrypt-text">${Meta.title}</h1>
                                <p class="post-description">"${Meta.description}"</p>
                                <p class="post-author">- ${Meta.author}</p>
                            </div>
                            `
                }
                return ``
            })()}
                    ${await RewriteMarkdown(markdown.parse(Content))}
                </div>
            </div>
            ${await Footer(Request, `// By ${Meta.author}`, `Written ${Meta.date}`)}
            ${await LightDarkToggle(Request)}
            `
        )}
        `
    }
}
module.exports = { Post }
