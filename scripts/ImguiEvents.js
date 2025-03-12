if (window.location.pathname == "/") {
    let HoveringOver = false;
    function js_resizeCanvas() {
        document.getElementById('canvas').width = window.innerWidth;
        document.getElementById('canvas').height = window.innerHeight;
    }
    function js_ignoreInput() {
        HoveringOver = false;
    }
    function js_stopIgnoringInput() {
        HoveringOver = true;
    }
    document.addEventListener("mousemove", async (event) => {
        if (HoveringOver) {
            document.getElementById('canvas').style.pointerEvents = "none"
            await new Promise(r => setTimeout(r, 10));
            document.getElementById('canvas').style.pointerEvents = "all"
        }
    })
    document.addEventListener("click", (event) => {
        if (HoveringOver) {
            document.getElementById('canvas').style.pointerEvents = "none"
            document.elementFromPoint(event.clientX, event.clientY)?.click();
            document.getElementById('canvas').style.pointerEvents = "all"
        }
    })
}