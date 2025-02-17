const SetHighlight = (id) => {
    let targetElement = document.getElementById(id)
    let highlightElement = document.getElementById("highlight")
    let targetBounds = targetElement.getBoundingClientRect();
    highlightElement.style.top = `${targetBounds.top}px`;
    highlightElement.style.left = `${targetBounds.left}px`;
    highlightElement.style.width = `${targetBounds.right - targetBounds.left}px`
    highlightElement.style.height = `${targetBounds.bottom - targetBounds.top}px`
}