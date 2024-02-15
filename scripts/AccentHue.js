const SetHue = () => {
    const HueProgress = (new Date(Date.now()).getMinutes() / 60) * 360
    document.querySelector(':root').style.setProperty('--accent-color-hue', HueProgress)
}

SetHue()
setInterval(SetHue, 1)
