if (window.location.pathname != '/') {
    let Elements = document.getElementsByTagName("img")
    for (let x = 0; x < Elements.length; x++) {
        Elements[x].parentElement.style.textAlign = "center"
    }
}