let lastId = ""
const SetHighlight = async (id) => {
    return;
    if (id == lastId) return;
    lastId = id;

    let targetElement = document.getElementById(id)
    let highlightElement = document.getElementById("highlight")
    let targetBounds = targetElement.getBoundingClientRect();
    highlightElement.style.top = `${targetBounds.top}px`;
    highlightElement.style.left = `${targetBounds.left}px`;
    highlightElement.style.width = `${targetBounds.right - targetBounds.left}px`
    highlightElement.style.height = `${targetBounds.bottom - targetBounds.top}px`
    highlightElement.style.transform = `scaleX(${110}%) scaleY(${130}%)`
    await new Promise(r => setTimeout(r, 250 / 4));
    highlightElement.style.transform = `scaleX(${100}%) scaleY(${100}%)`
}

// Move selection up and down with arrows
if (window.location.pathname == "/") {
    document.addEventListener("keydown", async (event) => {
        let currentId = parseInt(lastId.substring(4))
        switch (event.code) {
            case "ArrowUp":
                currentId--
                break;
            case "ArrowDown":
                currentId++
                break;
            case "Enter":
                document.getElementById(lastId).click()
                break;
        }
        const newId = `post${currentId}`
        if (document.getElementById(newId))
            SetHighlight(newId)
    })

    SetHighlight("post0")
}
else {
    document.addEventListener("keydown", async (event) => {
        switch(event.code) {
            case "Backspace":
                document.getElementsByClassName("back-button")[0].click()
                break;
        }
    })
}