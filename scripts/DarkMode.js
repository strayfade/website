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

document.getElementById("light-dark-toggle").addEventListener("click", () => {
    if (GetCookie("lightMode") == "true") {
        SetCookie("lightMode", "false")
        document.body.style.setProperty("--foreground", "var(--dark)")
        document.body.style.setProperty("--background", "var(--light)")
        document.getElementById("darkmode-moon").style.display = "block"
        document.getElementById("darkmode-sun").style.display = "none"
    }
    else {
        SetCookie("lightMode", "true")
        document.body.style.setProperty("--foreground", "var(--light)")
        document.body.style.setProperty("--background", "var(--dark)")
        document.getElementById("darkmode-moon").style.display = "none"
        document.getElementById("darkmode-sun").style.display = "block"
    }
})

if (GetCookie("lightMode") != "true") {
    document.getElementById("darkmode-moon").style.display = "block"
    document.getElementById("darkmode-sun").style.display = "none"
}
else {
    document.getElementById("darkmode-moon").style.display = "none"
    document.getElementById("darkmode-sun").style.display = "block"
}