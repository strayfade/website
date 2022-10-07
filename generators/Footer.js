const { getEmoji } = require('language-flag-colors')
const fs = require('fs')
function GenerateFooter(Article, Locale, Flag) {

    Output = ""
    Output += "<footer>\n"
    Output += "<div class='Footer'>"
    Output += "<div class='FooterInner DisplayWidth'>"

    Output += "<div class='FooterObject'>"
    Output += "<select name='LanguageSelector' id='LanguageSelector' onchange='SetLanguageOptions()'>"


    let filenames = fs.readdirSync(__dirname.replace("generators", "localization/"));
    for (var x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith(".json")) {
            let LangShort = filenames[x].replace(".json", "");
            switch (LangShort) {
                case "en":
                    LangShort = "en-us"
                    break;
            }
            Output += "<option value='DefaultLanguage'>" + getEmoji(LangShort) + "</option>"
        }
    }

    Output += "</select>"
    Output += "</div>"

    Output += "<div class='FooterObject FloatRight'>"
    Output += "<h1>" + Locale.copyright_main + "</h1>"
    Output += "</div>"
    Output += "<div class='FooterObject'>"
    Output += "<p class='Icon NoSelect NoSpacing'>S</p>"
    Output += "</div>"

    Output += "</div>"
    Output += "</div>"
    Output += "</footer>\n"
    return Output
}

module.exports = { GenerateFooter }