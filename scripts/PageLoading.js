let LoadingScreen = document.getElementById("LoadingScreen")

var AllElements = document.body.getElementsByTagName('*');
for (let x = 0; x < AllElements.length; x++) {
    if (AllElements[x].hasAttribute("href")) {
        const oHref = AllElements[x].getAttribute("href");
        let Domain = oHref.split("://").pop().split("/")[0]
        if (Domain === "strayfade.com" || Domain === "") {
            AllElements[x].removeAttribute("href")
            AllElements[x].style.cursor = "pointer";
            AllElements[x].addEventListener("click", async function(ClickEvent) {
                await PlaceLoadingBuffer()
                window.location.href = oHref;
            })
        }
    }
}

async function PlaceLoadingBuffer() {
    LoadingScreen.classList.add("LoadingScreenVisible")
    await new Promise(r => setTimeout(r, 150));
}
async function ClearLoadingBuffer() {
    await new Promise(r => setTimeout(r, 150));
    LoadingScreen.classList.remove("LoadingScreenVisible")
}
ClearLoadingBuffer();