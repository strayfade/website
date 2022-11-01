let TagsToAffect = ["h1"]
if (!window.location.toString().endsWith("/")) {
    TagsToAffect.push("h2")
    TagsToAffect.push("h3")
}

var HeaderElements = [];
function PlaceEffectBoxes() {
    for (let x = 0; x < TagsToAffect.length; x++) {
        var Found = document.getElementsByTagName(TagsToAffect[x])
        for (let y = 0; y < Found.length; y++) {
            HeaderElements.push(Found[y])
        }
    }
    let EffectElements = [];
    for (var x = 0; x < HeaderElements.length; x++) {
            let Position = HeaderElements[x].getBoundingClientRect();
            let Current = document.createElement("div")
            Current.className = "EffectBox"
            Current.style.left = (Position.x + document.documentElement.scrollLeft) + "px"
            Current.style.top = (Position.y + document.documentElement.scrollTop) + "px"
            Current.style.width = Position.width + "px"
            Current.style.height = Position.height + "px"
            let Child = document.createElement("div")
            Child.className = "EffectBoxActive"
            Current.appendChild(Child.cloneNode())
            EffectElements.push(Child)
            HeaderElements[x].appendChild(Current)
    }
    let TargetClosing = document.getElementsByClassName("EffectBoxActive")
    for (var x = 0; x < TargetClosing.length; x++) {
        TargetClosing[x].classList.add("EffectBoxInactive")
    }
}
window.addEventListener('load', PlaceEffectBoxes)
function ReplaceEffectBoxes() {
    let Target = document.getElementsByClassName("EffectBox")
    for (var x = 0; x < Target.length; x++) {
        if (HeaderElements[x].parentNode.nodeName != "BLOCKQUOTE") {
            let Position = HeaderElements[x].getBoundingClientRect();
            Target[x].style.left = (Position.x + document.documentElement.scrollLeft) + "px"
            Target[x].style.top = (Position.y + document.documentElement.scrollTop) + "px"
            Target[x].style.width = Position.width + "px"
            Target[x].style.height = Position.height + "px"
        }
    }
}

function RandomizeColors() {
    document.querySelector(':root').style.setProperty('--accent-color-hue', Math.floor(Math.random() * 360));
}

// This is <REALLY> stupid, but it works
function OnResize() {
    ReplaceEffectBoxes()
    PositionLinkElements()
}
setInterval(OnResize, 20);