const path = require('path')
const fs = require('fs').promises

const HTML = require('../components/HTML').HTML
const Head = require('../components/Head').Head
const Body = require('../components/Body').Body
const Footer = require('../components/Footer').Footer

const { GenDecryptText } = require("../components/EncryptedTextUtil")

const Homepage = async (Request, BuildData) => {
    return `
        ${await HTML(Request)}
        ${await Head(Request, 'Home', 'official strayfade website (real)', BuildData)}
        ${await Body(
        Request,
        `
            <div>
                <div class="article-content homepage-content">
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

            let Output = `
                ${await Footer(Request, "strayfade", `Copyright (c) strayfade 2024`)}
            `
            for (const Post of AllPosts) {
                
                Output += `
                                <a class="post${Post.data.pinned ? ` post-pinned` : ``}" href="/${Post.file.split(".")[0]}" id="post${AllPosts.indexOf(Post)}" onmouseover="SetHighlight('post${AllPosts.indexOf(Post)}')">
                                    <div class="post-header">
                                        ${GenDecryptText("h3", Post.data.title)}
                                        ${GenDecryptText("p", Post.data.date, "post-date")}
                                    </div>
                                    ${GenDecryptText("p", Post.data.description)}
                                </a>
                            `
            }

            return Output;
        })()}
                </div>
            </div>
            <div id="highlight"></div>
            `
    , BuildData)}
    `
}
module.exports = { Homepage }
