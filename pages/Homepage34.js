const path = require('path')
const fs = require('fs').promises

const HTML = require('../components/HTML').HTML
const Head = require('../components/Head').Head
const Body34 = require('../components/Body34').Body34
const Footer = require('../components/Footer').Footer
const LightDarkToggle = require('../components/LightDarkToggle').LightDarkToggle

const Homepage34 = async (Request) => {
    return `
        ${await HTML(Request)}
        ${await Head(Request, 'Home', 'official strayfade website (real)')}
        ${await Body34(
            Request,
            `
            <div class="content-scrollable">
                <div class="content-width article-content" style="margin: 0px; max-width: calc(100vw - 50px * 2);">
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
                                <a class="post${/*Post.data.pinned ? ` post-pinned` : */``}" href="/${Post.file.split(".")[0]}" style="margin: 40px auto;">
                                    <div class="post-header" style="width: max-content; margin: auto;">
                                        <h3 class="decrypt-text">${Post.data.title}</h3>
                                        <p class="decrypt-text">${Post.data.date}</p>
                                    </div>
                                    <p>${Post.data.description}</p>
                                </a>
                            `
                        }
                        
                        return Output;
                    })()}
                </div>
                <p style="text-align: center; font-size: 11px;">Rule : If it exists there is a post about it. If not, I'll write one.</p>
                <p style="text-align: center; font-size: 11px;">At strayfade.com its easy to find any kind of post. Happy browsing!</p>
            </div>
            `
        )}
    `
}
module.exports = { Homepage34 }
