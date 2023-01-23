let UseLightMode = false;

async function SetLightMode(Enabled) {
    document.documentElement.style.setProperty("--transition-length", "0.0s")
    UseLightMode = Enabled;

    if (!Enabled) {
        document.getElementById("LightModeToggleLight").classList.add('Hidden')
        document.getElementById("LightModeToggleDark").classList.remove('Hidden')
    }
    else {
        document.getElementById("LightModeToggleLight").classList.remove('Hidden')
        document.getElementById("LightModeToggleDark").classList.add('Hidden')
    }

    let LightColor = getComputedStyle(document.documentElement).getPropertyValue("--lighten-color")
    let DarkColor = getComputedStyle(document.documentElement).getPropertyValue("--darken-color")
    document.documentElement.style.setProperty("--foreground-color", Enabled ? DarkColor : LightColor)
    document.documentElement.style.setProperty("--background-color", Enabled ? LightColor : DarkColor)
    document.getElementsByTagName("body")[0].style.backgroundImage = Enabled ? "var(--darkmode-background-image)" : "var(--lightmode-background-image)"

    localStorage.setItem("UseLightMode", Enabled)
    document.documentElement.style.setProperty("--transition-length", "0.25s")
}
window.addEventListener("load", async function() {
    if (localStorage.getItem("UseLightMode")) {
        UseLightMode = localStorage.getItem("UseLightMode") === 'true'
    }
    await SetLightMode(UseLightMode);
})