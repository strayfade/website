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
                <div style="position: absolute;z-index: 1;transform: scale(5, 5); opacity: 0.2; pointer-events: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="1"><defs><filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
                    <feTurbulence type="turbulence" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence" baseFrequency="0.5"></feTurbulence>
                    <feSpecularLighting surfaceScale="40" specularConstant="3" specularExponent="20" lighting-color="#ff0000" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
                            <feDistantLight azimuth="3" elevation="80"></feDistantLight>
                    </feSpecularLighting>
</filter></defs><rect width="700" height="700" fill="#ff0000" filter="url(#nnnoise-filter)" style="position: absolute;z-index: 999;"></rect></svg>
                </div>

                <div style="position: absolute;
  z-index: 1;
  width: 1000px;
  height: 1000px;
  pointer-events: none;
  opacity: 1;
  transform: scaleY(-500%) translateY(40%);
  filter: brightness(3) contrast(10);">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 2000 1000" width="2000px" height="1000px"><defs><linearGradient gradientTransform="rotate(-314, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient2"><stop stop-color="hsla(0, 0%, 0%, 1.00)" stop-opacity="1" offset="-0%"></stop><stop stop-color="black" stop-opacity="0" offset="100%"></stop></linearGradient><linearGradient gradientTransform="rotate(314, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient3"><stop stop-color="black" stop-opacity="1"></stop><stop stop-color="black" stop-opacity="0" offset="100%"></stop></linearGradient><filter id="gggrain-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="1.25" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="colormatrix"></feColorMatrix>
  <feComponentTransfer x="0%" y="0%" width="100%" height="100%" in="colormatrix" result="componentTransfer">
    <feFuncR type="linear" slope="3"></feFuncR>
    <feFuncG type="linear" slope="3"></feFuncG>
    <feFuncB type="linear" slope="3"></feFuncB>
  </feComponentTransfer>
  <feColorMatrix x="0%" y="0%" width="100%" height="100%" in="componentTransfer" result="colormatrix2" type="matrix" values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 22 -14"></feColorMatrix>
  </filter><filter id="gggrain-saturate" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="3" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" result="colormatrix"></feColorMatrix>
  </filter></defs><g filter="url(#gggrain-saturate)"><rect width="100%" height="100%" fill="hsl(0, 100%, 50%)"></rect><rect width="100%" height="100%" fill="url(#gggrain-gradient3)"></rect><rect width="100%" height="100%" fill="url(#gggrain-gradient2)"></rect><rect width="100%" height="100%" fill="transparent" filter="url(#gggrain-filter)" opacity="1" style="mix-blend-mode: overlay"></rect></g></svg>
                </div>

                <div style="position: absolute;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  transform: scale3d(01, -1, 1);
  filter: brightness(1) contrast(1);
  left: 700px;">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 5000 5000" width="100vw" height="100vw"><defs><linearGradient gradientTransform="rotate(-314, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient2"><stop stop-color="hsla(0, 0%, 0%, 1.00)" stop-opacity="1" offset="-0%"></stop><stop stop-color="black" stop-opacity="0" offset="100%"></stop></linearGradient><linearGradient gradientTransform="rotate(314, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient3"><stop stop-color="black" stop-opacity="1"></stop><stop stop-color="black" stop-opacity="0" offset="100%"></stop></linearGradient><filter id="gggrain-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="1.25" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="colormatrix"></feColorMatrix>
  <feComponentTransfer x="0%" y="0%" width="100%" height="100%" in="colormatrix" result="componentTransfer">
    <feFuncR type="linear" slope="3"></feFuncR>
    <feFuncG type="linear" slope="3"></feFuncG>
    <feFuncB type="linear" slope="3"></feFuncB>
  </feComponentTransfer>
  <feColorMatrix x="0%" y="0%" width="100%" height="100%" in="componentTransfer" result="colormatrix2" type="matrix" values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 22 -14"></feColorMatrix>
  </filter><filter id="gggrain-saturate" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="3" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" result="colormatrix"></feColorMatrix>
  </filter></defs><g filter="url(#gggrain-saturate)"><rect width="100%" height="100%" fill="hsl(0, 100%, 50%)"></rect><rect width="100%" height="100%" fill="url(#gggrain-gradient3)"></rect><rect width="100%" height="100%" fill="url(#gggrain-gradient2)"></rect><rect width="100%" height="100%" fill="transparent" filter="url(#gggrain-filter)" opacity="1" style="mix-blend-mode: overlay"></rect></g></svg>
                </div>

                <div id="junk">
                </div>

                <span id="counter-1"></span>
                <span id="counter-2"></span>

                <div class="article-content" style="margin: 0px; padding: 50px; width: calc(100% - 100px); position: absolute; z-index: 9999;">
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
            let Songs = [
                {
                    name: "headhunter",
                },
                {
                    name: "vanity fair",
                },
                {
                    name: "cherry venom",
                },
                {
                    name: "do you remember? (interlude)",
                },
                {
                    name: "soulseeker",
                },
                {
                    name: "got away",
                },
                {
                    name: "lost in translation",
                },
                {
                    name: "the sky is falling",
                },
            ]
            for (const [idx, Song] of Songs.entries()) {

                Output += `
                                <div class="post ${Song.name == "headhunter" ? "post-pinned" : ""}">
                                    <div class="post-header">
                                        ${GenDecryptText("h3", Song.name)}
                                        ${GenDecryptText("p", idx != 0 ? `.` : ``)}
                                    </div>
                                    ${GenDecryptText("p", ` `)}
                                </div>
                            `
            }

            return Output;
        })()}
                </div>
            </div>
            ${await Footer(Request, `${(() => {
            const FooterOpts = [
                `Stream Headhunter`,
                `Designed by Noah`,
                `An album by Strayfade`,
                `By Strayfade`,
                `Album 2`,
                `Made with <3 by Noah`,
            ]
            return FooterOpts[Math.floor(Math.random() * FooterOpts.length)];
        })()}`, `Copyright (c) Strayfade 2024`)}
            `
        , BuildData)}
    `
}
module.exports = { Homepage }
