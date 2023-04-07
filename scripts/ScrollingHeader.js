if (window.location.pathname != '/') {
    let Elems = [document.getElementById("SidebarMain"), document.getElementsByClassName("Header")[0]]
    Elems.forEach(function (Elem) {
        Elem.classList.add("ScrollAffectable")
    })
    const Scrollable = document.getElementsByClassName("Scrollable")[0]
    Scrollable.addEventListener("scroll", function (e) {
        let ScrollDistance = Scrollable.scrollTop;
        Elems.forEach(function (Elem) {
            if (ScrollDistance > 0) {
                Elem.classList.add("ScrollLowOpacity")
            }
            else {
                Elem.classList.remove("ScrollLowOpacity")
            }
        })
    })
}