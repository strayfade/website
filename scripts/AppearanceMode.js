let UseLightMode = false;

async function SetLightMode(Enabled) {
    UseLightMode = Enabled;

    await new Promise(resolve => setTimeout(resolve, 1));
    if (!Enabled) {
        document.getElementById("LightModeToggle").classList.add('fa-moon')
    }
    else {
        document.getElementById("LightModeToggle").classList.add('fa-sun')
    }

    let LightColor = getComputedStyle(document.documentElement).getPropertyValue("--lighten-color")
    let DarkColor = getComputedStyle(document.documentElement).getPropertyValue("--darken-color")
    document.documentElement.style.setProperty("--foreground-color", Enabled ? DarkColor : LightColor)
    document.documentElement.style.setProperty("--background-color", Enabled ? LightColor : DarkColor)

    localStorage.setItem("UseLightMode", Enabled)
}

window.addEventListener("load", async function() {
    if (localStorage.getItem("UseLightMode")) {
        UseLightMode = localStorage.getItem("UseLightMode") === 'true'
    }
    await SetLightMode(UseLightMode);
})