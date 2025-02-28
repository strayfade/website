let lastId = ""
const SetHighlight = async (id) => {
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
    highlightElement.style.transform = `scaleX(${100}%) scaleY(${120}%)`
}