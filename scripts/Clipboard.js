// Credit https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function FallbackCopyToClipboard(Text) {
    var textArea = document.createElement("textarea");
    textArea.value = Text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error(err);
    }

    document.body.removeChild(textArea);
}
function CopyToClipboard(Text) {
    if (!navigator.clipboard) {
        FallbackCopyToClipboard(Text);
        return;
    }
    navigator.clipboard.writeText(Text).then(function () {
        // Do Nothing
    }, function (err) {
        console.error(err);
    });
}