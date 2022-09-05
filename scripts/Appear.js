window.addEventListener('load', function () {
    let HeaderElements = document.getElementsByTagName("h1")
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
        HeaderElements[x].classList.add("AccentColored")
    }
    var x = 0;
    let TargetClosing = document.getElementsByClassName("EffectBoxActive")
    function HideObscure() {
        setTimeout(function () {
            TargetClosing[x].classList.add("EffectBoxInactive")
            HeaderElements[x].classList.remove("AccentColored")
            x++;
            if (x < TargetClosing.length) {
                HideObscure();
            }
        }, 50)
    }
    HideObscure();
})
function ReplaceEffectBoxes() {
    let HeaderElements = document.getElementsByTagName("h1")
    let Target = document.getElementsByClassName("EffectBox")
    for (var x = 0; x < Target.length; x++) {
        let Position = HeaderElements[x].getBoundingClientRect();
        Target[x].style.left = (Position.x + document.documentElement.scrollLeft) + "px"
        Target[x].style.top = (Position.y + document.documentElement.scrollTop) + "px"
        Target[x].style.width = Position.width + "px"
        Target[x].style.height = Position.height + "px"
    }
}

// This is <REALLY> stupid, but it works
setInterval(function () {
    ReplaceEffectBoxes()
}, 10);

document.addEventListener("load", function() {
    window.navigator.vibrate(100)
})