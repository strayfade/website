const fs = require('fs')
const Markdown = require("markdown").markdown;
const { Localize } = require('./tools/LocaleTools')
function GenerateShareSection(Locale) {
    let Output = "";

    Output += "<div class='ShareSection'>"
    Output += "<p class='ShareHeader'>" + Localize(Locale, "share_section_header") + "</p>"
    Output += "<div class='ShareButtonContainer'>"

    Output += "<a class='ShareItemLink' onclick='navigator.clipboard.writeText(document.URL);'>"
    Output += "<div class='ShareItem ShareButtonGray'>"
    Output += "<i class='fa-solid fa-link ShareItemInner'></i>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a class='ShareItemLink' onclick='window.open(`https://www.facebook.com/sharer/sharer.php?u=` + encodeURIComponent(document.URL) + `&quote=` + encodeURIComponent(document.URL)) '>"
    Output += "<div class='ShareItem ShareButtonFacebook'>"
    Output += "<i class='fa-brands fa-facebook-f ShareItemInner'></i>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a class='ShareItemLink' onclick='window.open(`https://twitter.com/intent/tweet?text=` + encodeURIComponent(document.title) + `:%20` + encodeURIComponent(document.URL))'>"
    Output += "<div class='ShareItem ShareButtonTwitter'>"
    Output += "<i class='fa-brands fa-twitter ShareItemInner'></i>"
    Output += "</div>"
    Output += "</a>"

    Output += "<a class='ShareItemLink' onclick='window.open(`https://www.reddit.com/submit?url=` + encodeURIComponent(document.URL) + `&title=` +  encodeURIComponent(document.title))'>"
    Output += "<div class='ShareItem ShareButtonReddit'>"
    Output += "<i class='fa-brands fa-reddit-alien ShareItemInner'></i>"
    Output += "</div>"
    Output += "</a>"

    Output += "</div>"
    Output += "</div>"

    return Output;
}
function GenerateBody(Article, Locale, AvailablePages, AvailablePageSelector, Custom) {

    // Markdown
    let MarkdownString = fs.readFileSync(__dirname.replace("generators", "posts/") + Article.markdown).toString()
    if (Custom != "") {
        MarkdownString += "\n\n" + Custom
    }
    let MarkdownHtml = Markdown.toHTML(MarkdownString)

    // Credit https://infusion.media/content-marketing/how-to-calculate-reading-time/
    let MarkdownWorkCount = MarkdownString.split(" ").length
    let ReadingTime = Math.ceil(MarkdownWorkCount / 100)

    Output = ""

    switch (AvailablePageSelector) {
        case AvailablePages.Home:
            Output += "<div class='ArticleContainer'>"
        
            // Article Title/Subtitle
            Output += "<div class='DisplayWidth'>"
            let filenames = fs.readdirSync(__dirname.replace("generators", "posts/"));
            for (var x = 0; x < filenames.length; x++) {
                if (filenames[x].endsWith(".json")) {
                    let JSON = require(__dirname.replace("generators", "posts/") + filenames[x])
                    if (JSON.indexed) {
                        Output += "<a class='LinkNormal' href='/" + filenames[x].replace(".json", "") + "'>"
                        Output += "<div class='ArticleIndexBox'>"
                        Output += "<div class='Flexbox'>"
                        Output += "<h1 class='ArticleIndexBoxTitle FloatLeft'>" + JSON.title + "</h1>"
                        Output += "<p class='ArticleIndexBoxDate FloatLeft'>" + JSON.date + "</p>"
                        Output += "</div>"
                        Output += "<h3 class='ArticleIndexBoxDescription'>" + JSON.description + "</h3>"
                        Output += "</div>"
                        Output += "</a>"
                    }
                }
            }
            Output += "</div>"
            Output += "</div>"

            break;
        case AvailablePages.R:
            Output += fs.readFileSync(__dirname.replace("generators", "assets") + "/Rem")
            break;
        case AvailablePages.Dynamic:
            Output += "<div class='ArticleContainer'>"
        
            // Article Title/Subtitle
            Output += "<div class='DisplayWidth'>"
            if (Article.showTitle) {
                Output += "<div class='ArticleHeader'>"
                Output += "<p class='ArticleHeaderDate'>" + Article.date + "</p>"
                Output += "<h1 class='ArticleHeaderTitle'>" + Article.title + "</h1>"
                Output += "<span class='ArticleHeaderSubtitle'>" + Localize(Locale, "article_author_prefix") + Article.author + " •</span>"
                Output += "<span class='ArticleHeaderSubtitle'> " + ReadingTime + Localize(Locale, "article_read_time") + "</span>"
                Output += "</div>"
            }
            Output += MarkdownHtml // Article MD

            if (Article.indexed)
                Output += GenerateShareSection(Locale)
            Output += "</div>"
            Output += "</div>"

            break;
    }
    return Output
}

module.exports = { GenerateBody }