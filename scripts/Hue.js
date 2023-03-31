function SetHue() {
    if (window.location.pathname.toLowerCase().endsWith("deepaim")) {
        document.querySelector(':root').style.setProperty('--accent-color-hue', 0);
        document.querySelector(':root').style.setProperty('--accent-color-saturation', 0);
        document.querySelector(':root').style.setProperty('--accent-color-value', 1);
    }
    else {
        const date = new Date();
        const diff = date - new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
        const progress = (diff / (1000 * 60 * 60 * 24)) / 7 * 360;
        document.querySelector(':root').style.setProperty('--accent-color-hue', progress);
    }
}

SetHue()
setInterval(function() {
    SetHue()
}, 10000)