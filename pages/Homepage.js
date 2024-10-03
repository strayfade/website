const path = require('path')
const fs = require('fs').promises

const HTML = require('../components/HTML').HTML
const Head = require('../components/Head').Head
const Body = require('../components/Body').Body
const Footer = require('../components/Footer').Footer
const LightDarkToggle = require('../components/LightDarkToggle').LightDarkToggle

const { ConvertToEncrypted, GenDecryptText } = require("../components/EncryptedTextUtil")

const Homepage = async (Request, BuildData) => {
    return `
        ${await HTML(Request)}
        ${await Head(Request, 'Home', 'official strayfade website (real)', BuildData)}
        ${await Body(
        Request,
        `
            <div>
                <div class="article-content" style="margin: 0px; padding: 50px; width: calc(100% - 100px);">
                    ${await (async () => {
            const GetPosts = async (Pinned) => {
                let Posts = []

                let filenames = await fs.readdir(path.join(__dirname, `../posts`))
                for (let x = 0; x < filenames.length; x++) {
                    if (filenames[x].endsWith('.md')) {
                        let Metadata = await fs.readFile(path.join(__dirname, `../posts/${filenames[x]}`), {
                            encoding: 'utf-8',
                        })
                        let Current = JSON.parse(Metadata.split('}')[0] + '}')
                        if (Current.indexed && ((Pinned && Current.pinned) || (!Pinned && !Current.pinned))) {
                            Posts.push({ data: Current, file: filenames[x] })
                        }
                    }
                }
                Posts.sort((a, b) => {
                    const FirstDate = new Date(a.data.date)
                    const SecondDate = new Date(b.data.date)
                    return SecondDate - FirstDate
                })
                return Posts
            }
            let AllPosts = await GetPosts(true)
            for (const Post of await GetPosts(false))
                AllPosts.push(Post)

            let Output = ``
            for (const Post of AllPosts) {
                
                Output += `
                                <a class="post${Post.data.pinned ? ` post-pinned` : ``}" href="/${Post.file.split(".")[0]}">
                                    <div class="post-header">
                                        ${GenDecryptText("h3", Post.data.title)}
                                        ${GenDecryptText("p", Post.data.date)}
                                    </div>
                                    ${GenDecryptText("p", Post.data.description)}
                                </a>
                            `
            }

            return Output;
        })()}
                </div>
            </div>
            ${await Footer(Request, `// ${(() => {
            const FooterOpts = [
                `Made by Me`,
                `Designed by Noah`,
                `Strayfade`,
                `Version Five`,
                `Made with <3 by Noah`,
                `I did that!`,
            ]
            return FooterOpts[Math.floor(Math.random() * FooterOpts.length)];
        })()}`, `Copyright (c) Strayfade 2024`)}
            ${await LightDarkToggle(Request)}
            `
    , BuildData)}
    `
}
module.exports = { Homepage }
