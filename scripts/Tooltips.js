function SetupTooltips() {
    const El = document.querySelectorAll('[data-tooltip]');
    for (var x = 0; x < El.length; x++) {
        let Curr = El[x]
        Curr.addEventListener("mouseover", function () {
            document.getElementById("TooltipText").innerHTML = Curr.getAttribute("data-tooltip")
            let Tooltip = document.getElementById("TooltipText");
            let Size = Tooltip.getBoundingClientRect();
            let ParentSize = Curr.getBoundingClientRect()
            Tooltip.style.left = (ParentSize.width / 2 + ParentSize.x - Size.width / 2) + "px"
            Tooltip.style.top = (ParentSize.height / 2 + ParentSize.y + Size.height - 6) + "px"
            document.getElementById("TooltipText").classList.remove("TooltipInactive")
            document.getElementById("TooltipText").classList.add("TooltipActive")
        })
        Curr.addEventListener("mouseleave", function () {
            document.getElementById("TooltipText").classList.remove("TooltipActive")
            document.getElementById("TooltipText").classList.add("TooltipInactive")
        })
    }
}
window.addEventListener("load", function () {
    SetupTooltips();
})