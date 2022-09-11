function CreateSyntaxHighlighting() {
    hljs.highlightAll();
}
let CopyElements = [];
let CodeElements = [];
let Inners = [];
function PositionCopyElements() {
    CopyElements = document.getElementsByClassName("fa-copy CodeCopyButton")
    for (var x = 0; x < CodeElements.length; x++) {
        let CurrentCode = CodeElements[x];
        let CurrentCopy = CopyElements[x];
        let Position = CurrentCode.getBoundingClientRect();
        let Padding = 9;
        let Size = 20;
        CurrentCopy.style.left = (Position.x + Position.width - Padding - Size + document.documentElement.scrollLeft) + "px"
        CurrentCopy.style.top = (Position.y + Padding + document.documentElement.scrollTop) + "px"
        CurrentCopy.style.width = Size + "px"
        CurrentCopy.style.height = Size + "px"

        // Bind event if none exists
        if (CurrentCopy.getAttribute('SetCopy') == null) {
            let Copy = Inners[x]
            CurrentCopy.addEventListener("click", (event) => {
                CopyToClipboard(Copy)
            })
            CurrentCopy.setAttribute('SetCopy', "True")
        }
    }
}
function CustomStyleExpandedCodeblocks() {
    let Codeblocks = document.getElementsByTagName("code");
    for (var x = 0; x < Codeblocks.length; x++) {
        let Current = Codeblocks[x];
        if (Current.parentElement.nodeName == "PRE") {
            Current.style.width = "100%"
            Current.style.display = "inline-block"
            let Inner = Current.textContent
            let CopyButton = document.createElement("i");
            CopyButton.classList = ["fa-regular fa-copy CodeCopyButton"]
            Current.appendChild(CopyButton);
            Inners.push(Inner);
            CodeElements.push(Current);

            // Setup Line Numbers
            if (Inner.split("\n").length > 1) {
                Current.style.paddingLeft = "35px"
                Current.style.width = "calc(100% - 29px)"
                let LineNumbers = document.createElement("p")
                LineNumbers.className = "CodeLineNumbers";
                for (var y = 0; y < Inner.split("\n").length; y++) {
                    LineNumbers.innerHTML += (y + 1).toString();
                    if (y < Inner.split("\n").length) {
                        LineNumbers.innerHTML += "\n"
                    }
                }
                LineNumbers.style.marginTop = (-50 / 3 * Inner.split("\n").length) + "px"
                Current.appendChild(LineNumbers)
            }
            else {
                Current.style.paddingLeft = "15px";
            }
        }
    }
}
window.addEventListener("load", function () {
    CreateSyntaxHighlighting();
    CustomStyleExpandedCodeblocks();
})