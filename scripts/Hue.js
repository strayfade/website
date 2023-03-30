function SetHue() {
    const date = new Date();
    const diff = date - new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    const progress = (diff / (1000 * 60 * 60 * 24)) / 7 * 360;
    document.querySelector(':root').style.setProperty('--accent-color-hue', progress);
}

function SetInvert() {
    const date = new Date();
    if (date.getHours() > 6) {
        document.getElementById("Slide1").style.backgroundColor = "black"
        document.getElementById("SlideContent1").style.filter += " invert(1)"
        let Affected = document.getElementsByClassName("Coloring1") 
        for (let x = 0; x < Affected.length; x++) {
            Affected[x].style.color = "white"
            Affected[x].style.fill = "white"
        }
        let Unaffected = document.getElementsByClassName("UnaffectedDarkMode") 
        for (let x = 0; x < Unaffected.length; x++) {
            Unaffected[x].style.filter += " invert(1)"
        }
        document.body.style.backgroundColor = "black"
    }
}

SetHue()
SetInvert()
setInterval(function() {
    SetHue()
}, 10000)