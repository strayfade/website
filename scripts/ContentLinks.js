const HyperlinkTags = ["h1", "h2", "h3"]
const BlacklistedParentNodeClassnames = ["HeaderObject", "FooterObject", "ArticleHeader"]

let HyperlinkElements = [];
let HyperlinkIndicatorElements = []
let CopyTextIndicatorElements = []
let Padding = 5;
let IconPadding = 5;
function PositionLinkElements() {
    for (let x = 0; x < HyperlinkElements.length; x++) {
        let Position = HyperlinkElements[x].getBoundingClientRect();
        let Size = (Position.height - IconPadding)
        let SizeFormatted = Size + "px"
        let Element = HyperlinkIndicatorElements[x]
        let CopyElement = CopyTextIndicatorElements[x]
        let CopyElementPosition = CopyElement.getBoundingClientRect();
        Element.style.width = SizeFormatted;
        Element.style.height = SizeFormatted;
        Element.style.marginLeft = (Padding + 2) + "px"
        Element.style.marginTop = IconPadding / 2 + "px"
        CopyElement.style.left = (Position.x + Position.width + Padding * 2 + Size + document.documentElement.scrollLeft) + "px"
        CopyElement.style.top = (Position.y + Position.height / 2 - CopyElementPosition.height / 2 + document.documentElement.scrollTop) + "px"
    }
}
if (!window.location.toString().endsWith("/")) {
    window.addEventListener("load", function () {
        for (let x = 0; x < TagsToAffect.length; x++) {
            var Found = document.getElementsByTagName(TagsToAffect[x])
            for (let y = 0; y < Found.length; y++) {
                let CanEnterArray = true;
                for (let z = 0; z < BlacklistedParentNodeClassnames.length; z++) {
                    if (Found[y].parentNode.classList.contains(BlacklistedParentNodeClassnames[z])) {
                        CanEnterArray = false;
                    }
                }
                if (CanEnterArray)
                    HyperlinkElements.push(Found[y])
            }
        }
        for (let x = 0; x < HyperlinkElements.length; x++) {
            let Element = HyperlinkElements[x]
            let Inner = Element.innerHTML.split("<div")[0]
            Element.id = encodeURIComponent(Inner)
            Element.style.cursor = "pointer";
            Element.classList.add("HyperlinkHeader")

            let HyperlinkIndicator = document.createElement("i")
            HyperlinkIndicator.classList = ["fa-solid fa-link HyperlinkIndicator"]
            HyperlinkIndicator.id = "HyperlinkIndicator" + x
            let CopyText = document.createElement("p")
            CopyText.innerHTML = "Copy Link"
            CopyText.className = "CopyText"
            CopyText.id = "CopyTextIndicator" + x
            Element.appendChild(HyperlinkIndicator)
            Element.appendChild(CopyText)
            document.getElementById(("HyperlinkIndicator" + x).toString()).classList.add("HyperlinkIndicatorDisabled")
            document.getElementById(("CopyTextIndicator" + x).toString()).classList.add("CopyTextDisabled")
            Element.addEventListener("mouseover", (event) => {
                document.getElementById(("HyperlinkIndicator" + x).toString()).classList.remove("HyperlinkIndicatorDisabled")

                document.getElementById(("CopyTextIndicator" + x).toString()).innerHTML = "Copy Link"
                document.getElementById(("CopyTextIndicator" + x).toString()).classList.remove("CopyTextDisabled")
            })
            Element.addEventListener("mouseleave", (event) => {
                document.getElementById(("HyperlinkIndicator" + x).toString()).classList.add("HyperlinkIndicatorDisabled")

                document.getElementById(("CopyTextIndicator" + x).toString()).classList.add("CopyTextDisabled")
            })
            Element.addEventListener("click", (event) => {
                CopyToClipboard(window.location.toString().split("#")[0] + "#" + Element.id);
                document.getElementById(("CopyTextIndicator" + x).toString()).innerHTML = "Copied!"
            })
            HyperlinkIndicatorElements.push(HyperlinkIndicator)
            CopyTextIndicatorElements.push(CopyText)
        }
        PositionLinkElements();
    })
}