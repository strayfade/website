const fs = require('fs')
const markdown = require("markdown").markdown;

function GenerateArticleBody(Article, Locale) {

    // Markdown
    let MdStr = fs.readFileSync(__dirname.replace("generators", "posts/") + Article.markdown).toString()
    let MdHtml = markdown.toHTML(MdStr)

    // Calculate reading time
    // Credit https://infusion.media/content-marketing/how-to-calculate-reading-time/
    let MdWordCount = MdStr.split(" ").length
    let ReadingTime = Math.ceil(MdWordCount / 100)

    Output = ""
    Output += "<div class='ArticleContainer'>"

    // Article Title/Subtitle
    Output += "<div class='DisplayWidth'>"
    if (Article.showTitle) {
        Output += "<div class='ArticleHeader'>"
        Output += "<h1 class='ArticleHeaderTitle'>" + Article.title + "</h1>"
        Output += "<span class='ArticleHeaderSubtitle'>" + Locale.article_author_prefix + Article.author + " •</span>"
        Output += "<span class='ArticleHeaderSubtitle'> " + ReadingTime + Locale.article_read_time + "</span>"
        Output += "</div>"
    }

    // Article Content
    Output += MdHtml

    // Google Form
    //Output += "<iframe style='filter: invert(1) brightness(2)' src='https://docs.google.com/forms/d/e/1FAIpQLScO17F732wv01xGUAPvEy2Eo965TnhVG733sBJUvPBB9G5UMQ/viewform?embedded=true' frameborder='0' marginheight='0' marginwidth='0' width='100%' height='2000px'>Loading…</iframe>"

    Output += "</div>"
    Output += "</div>"
    return Output
}

module.exports = { GenerateArticleBody }