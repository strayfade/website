let UseLightMode = false;

function SetLightMode(Enabled) {
    UseLightMode = Enabled;

    document.getElementById("LightModeToggle").classList.add(Enabled ? 'fa-sun' : 'fa-moon')
    document.getElementById("LightModeToggle").classList.remove(Enabled ? 'fa-moon' : 'fa-sun')

    let LightColor = getComputedStyle(document.documentElement).getPropertyValue("--lighten-color")
    let DarkColor = getComputedStyle(document.documentElement).getPropertyValue("--darken-color")
    document.documentElement.style.setProperty("--foreground-color", Enabled ? DarkColor : LightColor)
    document.documentElement.style.setProperty("--background-color", Enabled ? LightColor : DarkColor)

    localStorage.setItem("UseLightMode", Enabled)
}

window.addEventListener("load", function() {
    if (localStorage.getItem("UseLightMode")) {
        UseLightMode = localStorage.getItem("UseLightMode") === 'true'
    }
    SetLightMode(UseLightMode);
})