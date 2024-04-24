const path = require('path')
const fs = require('fs').promises

const HTML = require('../components/HTML').HTML
const Head = require('../components/Head').Head
const Body = require('../components/Body').Body
const Footer = require('../components/Footer').Footer

const Homepage = async (Request) => {
    return `
        ${await HTML(Request)}
        ${await Head(Request, 'Home', 'official strayfade website (real)')}
        ${await Body(
            Request,
            `
            <div class="content-scrollable">
                <div class="content-width article-content" style="margin: 0px;">
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
            </div>
            ${await Footer(Request, `// Made by Me`, `Copyright (©) Strayfade 2024`)}
            `
        )}
    `
}
module.exports = { Homepage }
