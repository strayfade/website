function SetHue() {
    let progress = Math.random() * 360;
    document.querySelector(':root').style.setProperty('--accent-color-hue', progress);
}
SetHue()