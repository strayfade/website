const SetCookie = (Name, Value, LengthDays) => {
    var Expires = "";
    if (LengthDays) {
        var date = new Date();
        date.setTime(date.getTime() + (LengthDays * 24 * 60 * 60 * 1000));
        Expires = "; expires=" + date.toUTCString();
    }
    document.cookie = Name + "=" + (Value || "") + Expires + "; SameSite=Strict; path=/";
}
const GetCookie = (Name) => {
    const Parts = `; ${document.cookie}`.split(`; ${Name}=`);
    if (Parts.length === 2) return Parts.pop().split(';').shift();
}

const UpdateViewportMode = () => {
    const LightMode = GetCookie("lightMode") != "true";
    if (LightMode) {
        document.getElementById("darkmode-moon").style.display = "block"
        document.getElementById("darkmode-sun").style.display = "none"
    }
    else {
        document.getElementById("darkmode-moon").style.display = "none"
        document.getElementById("darkmode-sun").style.display = "block"
    }
    let ImagesLoaded = document.getElementsByTagName("img")
    for (let i = 0; i < ImagesLoaded.length; i++) {
        if (!ImagesLoaded[i].hasAttribute("invertable")) continue;
        ImagesLoaded[i].style.filter = `invert(${LightMode ? 0 : 1})`
    }
}

document.getElementById("light-dark-toggle").addEventListener("click", () => {
    if (GetCookie("lightMode") == "true") {
        SetCookie("lightMode", "false")
        document.body.style.setProperty("--foreground", "var(--dark)")
        document.body.style.setProperty("--background", "var(--light)")
    }
    else {
        SetCookie("lightMode", "true")
        document.body.style.setProperty("--foreground", "var(--light)")
        document.body.style.setProperty("--background", "var(--dark)")
    }
    UpdateViewportMode()
})

UpdateViewportMode()