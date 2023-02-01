const fs = require('fs/promises');
const fsdir = require('fs');
const Markdown = require("markdown").markdown;
const { Localize } = require('./tools/LocaleTools')

function GenerateShareSection(Locale, Filename) {
    let Output = `

    <div class="ShareSection">
    <p class="ShareHeader">` + Localize(Locale, "share_section_header") + `</p>
    <div class="ShareButtonContainer">

    <a aria-label="Copy Link" class="ShareItemLink" onclick="navigator.clipboard.writeText(document.URL);">
    <div class="ShareItem ShareButtonGray">
    <svg class="ShareItemInner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path></svg>
    </div>
    </a>

    <a aria-label="Share to Facebook" class="ShareItemLink" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&quote=' + encodeURIComponent(document.URL))">
    <div class="ShareItem ShareButtonFacebook">
    <svg class="ShareItemInner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
    </div>
    </a>

    <a aria-label="Share to Twitter" class="ShareItemLink" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20' + encodeURIComponent(document.URL))">
    <div class="ShareItem ShareButtonTwitter">
    <svg class="ShareItemInner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
    </div>
    </a>

    <a aria-label="Share to Reddit" class="ShareItemLink" onclick="window.open('https://www.reddit.com/submit?url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title))">
    <div class="ShareItem ShareButtonReddit">
    <svg class="ShareItemInner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"></path></svg>
    </div>
    </a>

    </div>
    </div>

    <div class="ShareButtonContainer ShareMaxWidth">
    <a class="LinkNormal Spaced" href="https://github.com/Strayfade/Website/blob/main/posts/` + Filename + `" style="margin-left: auto;">View on GitHub</a>
    <a class="LinkNormal Spaced SpacedMobile" href="https://raw.githubusercontent.com/Strayfade/Website/main/posts/` + Filename + `">View Raw</a>
    </div>
    `

    return Output;
}

function CalculateAge() {
    var AgeDif = new Date(Date.now() - new Date(1131950100000))
    return Math.abs(AgeDif.getUTCFullYear() - 1970);
}

async function GenerateBody(Article2, Locale, AvailablePages, AvailablePageSelector, Custom, Filename) {
    Article = JSON.parse(Article2.split("}")[0] + "}")
    let MarkdownString = Article2.replace(Article2.split("}")[0] + "}", "")
    // Markdown
    if (Custom != "") {
        MarkdownString += "\n\n" + Custom
    }
    let MarkdownHtml = Markdown.toHTML(MarkdownString)

    // Credit https://infusion.media/content-marketing/how-to-calculate-reading-time/
    let MarkdownWorkCount = MarkdownString.split(" ").length
    let ReadingTime = Math.ceil(MarkdownWorkCount / 200)

    Output = ""

    switch (AvailablePageSelector) {
        case AvailablePages.Home:
            Output += `
                <div class='ArticleContainer'>
                <div class='ArticleWidth'>
                <div class='HomepageArticleContainer'>
            `

            // Index
            let Posts = []
            let indexed = [];

            let filenames = fsdir.readdirSync(__dirname.replace("generators", "posts/"));
            for (var x = 0; x < filenames.length; x++) {
                if (filenames[x].endsWith(".md")) {
                    let JSONstr = await fs.readFile(__dirname.replace("generators", "posts/") + filenames[x], {encoding: "utf-8"})
                    let Current = JSON.parse(JSONstr.split("}")[0] + "}")
                    if (Current.indexed) {
                        Posts.push({ data: Current, file: filenames[x] })
                    }
                }
            }
            Posts.sort(function(a, b) {
                const FirstDate = new Date(a.data.date) 
                const SecondDate = new Date(b.data.date) 
            
                return SecondDate - FirstDate
            })

            Posts.forEach(Post => {
                if (Post.file.endsWith(".md")) {
                    let JSON = Post.data
                    if (JSON.pinned) {
                        if (JSON.indexed) {
                            Output += `
                                <a aria-label="` + JSON.title + `" class="LinkNormal" href="/` + Post.file.replace(".md", "") + `">
                                <div class="ArticleIndexBox ArticlePinned">
                                <div class="Flexbox">
                                <h1 class="ArticleIndexBoxTitle FloatLeft">` + JSON.title + `</h1>
                                <div class="ArticleIndexPin">Pinned</div>
                                <p class="ArticleIndexBoxDate FloatLeft Monospace">` + JSON.date + `</p>
                                </div>
                                <p class="ArticleIndexBoxDescription">` + JSON.description + `</p>
                            `
                            if (JSON.tags) {
                                Output += `<div class="ArticleTagContainer">`
                                for (var y = 0; y < JSON.tags.length; y++) {
                                    Output += `<span class="ArticleTag Monospace">` + JSON.tags[y] + `</span>`
                                }
                                Output += `</div>`
                            }
                            Output += `
                                </div>
                                </a>
                            `
                        }
                        indexed.push(Post.file)
                    }
                }
            })
            Posts.forEach(Post => {
                if (!indexed.includes(Post.file)) {
                    if (Post.file.endsWith(".md")) {
                        let JSON = Post.data
                        if (JSON.indexed) {
                            Output += `
                                <a aria-label="` + JSON.title + `" class="LinkNormal" href="/` + Post.file.replace(".md", "") + `">
                                <div class="ArticleIndexBox ArticlePinned">
                                <div class="Flexbox">
                                <h1 class="ArticleIndexBoxTitle FloatLeft">` + JSON.title + `</h1>
                                <p class="ArticleIndexBoxDate FloatLeft Monospace">` + JSON.date + `</p>
                                </div>
                                <p class="ArticleIndexBoxDescription">` + JSON.description + `</p>
                            `
                            if (JSON.tags) {
                                Output += `<div class="ArticleTagContainer">`
                                for (var y = 0; y < JSON.tags.length; y++) {
                                    Output += `<span class="ArticleTag Monospace">` + JSON.tags[y] + `</span>`
                                }
                                Output += `</div>`
                            }
                            Output += `
                                </div>
                                </a>
                            `
                        }
                    }
                }
            })
            Output += `
                </div>
                </div>
                </div>
            `         

            // Homepage Hero Header
            Output += `
                <div class="HeroBanner DisplayWidth">
                <div class="HeroBannerInner">
                <div class="Flexbox">

                <div class="HeroBannerLeft">
                <h1>About Me</h1>
                <p><span>Hello! I am Noah, a </span><span data-tooltipsmall="Automatically Updates">` + CalculateAge() + `-year-old</span><span>software developer (primarily web development) and musician from the United States.</span></p>
                <p>You can send me an email at <a href="mailto:me@strayfade.com">me@strayfade.com</a> and I might read it, or you can shoot me a message on <a href="https://twitter.com/Strayfade">Twitter</a> or <a href="https://instagram.com/Strayfade">Instagram</a>.</p>
                <p>My current Discord tag is <a href="https://discord.com/users/455790298082181120">Strayfade#8472</a>, although I do not usually respond to direct messages on Discord.</p>
                </div>
            `

            Output += `
                </div>
                </div>
                </div>
            `

            break;
        case AvailablePages.R:
            Output += await fs.readFile(__dirname.replace("generators", "assets") + "/Rem", {encoding: "utf-8"})
            break;
        case AvailablePages.Dynamic:
            Output += `<div class="ArticleContainer ArticleContainerShort">`

            // Article Title/Subtitle
            Output += `<div class="ArticleWidth">`
            if (Article.showTitle) {
                Output += `
                    <div class="ArticleHeader">
                    <p class="ArticleHeaderDate Monospace" aria-hidden="true">` + Article.date + `</p>
                    <h1 class="ArticleHeaderTitle">` + Article.title + `</h1>
                    <h1 class="ArticleHeaderDescription">` + Article.description + `</h1>
                    <span class="ArticleHeaderSubtitle" aria-hidden="true">` + Localize(Locale, "article_author_prefix") + Article.author + ` •</span>
                    <span class="ArticleHeaderSubtitle" aria-hidden="true"> ` + ReadingTime + Localize(Locale, "article_read_time") + `</span>
                `
                if (Article.tags) {
                    Output += `<div class="ArticleTagContainer">`
                    for (var y = 0; y < Article.tags.length; y++) {
                        Output += `<span class="ArticleTag Monospace">` + Article.tags[y] + `</span>`
                    }
                    Output += `</div>`
                }
                Output += `</div>`
            }
            Output += MarkdownHtml // Article MD

            if (Article.indexed)
                Output += GenerateShareSection(Locale, Filename)
            Output += `
                </div>
                </div>
            `

            break;
    }
    return Output
}

module.exports = { GenerateBody }