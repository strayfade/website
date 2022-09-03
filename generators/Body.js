const fs = require('fs')
const markdown = require("markdown").markdown;

function GenerateBody(Article, Locale, isHomepage) {

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

    if (!isHomepage) {
        if (Article.showTitle) {
            Output += "<div class='ArticleHeader'>"
            Output += "<p class='ArticleHeaderDate'>" + Article.date + "</p>"
            Output += "<h1 class='ArticleHeaderTitle'>" + Article.title + "</h1>"
            Output += "<span class='ArticleHeaderSubtitle'>" + Locale.article_author_prefix + Article.author + " •</span>"
            Output += "<span class='ArticleHeaderSubtitle'> " + ReadingTime + Locale.article_read_time + "</span>"
            Output += "</div>"
        }

        // Article Content
        Output += MdHtml
    }
    else {
        let filenames = fs.readdirSync(__dirname.replace("generators", "posts/"));
        for (var x = 0; x < filenames.length; x++) {
            if (filenames[x].endsWith(".json")) {
                let JSON = require(__dirname.replace("generators", "posts/") + filenames[x])
                if (JSON.indexed) {
                    Output += "<div class='ArticleIndexBox' onclick='OpenURL(`/" + filenames[x].replace(".json", "") + "`)'>"
                    Output += "<span class='ArticleIndexBoxTitle'>" + JSON.title + "</span>"
                    Output += "<span class='ArticleIndexBoxDate'>" + JSON.date + "</span>"
                    Output += "<h3 class='ArticleIndexBoxDescription'>" + JSON.description + "</h3>"
                    Output += "</div>"
                }
            }
        }
    }

    Output += "</div>"
    Output += "</div>"
    return Output
}

module.exports = { GenerateBody }