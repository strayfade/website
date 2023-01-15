function SetupTooltips() {
    const El = document.querySelectorAll('[data-tooltip]');
    let Tooltip = document.getElementById("TooltipText");
    for (var x = 0; x < El.length; x++) {
        let Curr = El[x]
        Curr.addEventListener("mouseover", function () {
            document.getElementById("TooltipText").innerHTML = Curr.getAttribute("data-tooltip")
            let Size = Tooltip.getBoundingClientRect();
            let ParentSize = Curr.getBoundingClientRect()
            Tooltip.style.left = (ParentSize.width / 2 + ParentSize.x - Size.width / 2) + "px"
            Tooltip.style.top = (ParentSize.height / 2 + ParentSize.y + Size.height - 6 + document.documentElement.scrollTop) + "px"
            document.getElementById("TooltipText").classList.remove("TooltipInactive")
            document.getElementById("TooltipText").classList.add("TooltipActive")
        })
        Curr.addEventListener("mouseleave", function () {
            document.getElementById("TooltipText").classList.remove("TooltipActive")
            document.getElementById("TooltipText").classList.add("TooltipInactive")
        })
    }
    Tooltip.addEventListener("mouseleave", function () {
        document.getElementById("TooltipText").classList.remove("TooltipActive")
        document.getElementById("TooltipText").classList.add("TooltipInactive")
    })
    Tooltip.addEventListener("mouseover", function () {
        document.getElementById("TooltipText").classList.remove("TooltipInactive")
        document.getElementById("TooltipText").classList.add("TooltipActive")
    })
}
function SetupSmallTooltips() {
    const El = document.querySelectorAll('[data-tooltipsmall]');
    for (var x = 0; x < El.length; x++) {
        let Curr = El[x]
        Curr.style.cursor = "pointer"
        if (Curr.tagName != "A")
            Curr.classList.add("TooltipSmallIndicator")
        Curr.addEventListener("mouseover", function () {
            document.getElementById("TooltipText2").innerHTML = Curr.getAttribute("data-tooltipsmall")
            let Tooltip = document.getElementById("TooltipText2");
            let Size = Tooltip.getBoundingClientRect();
            let ParentSize = Curr.getBoundingClientRect()
            Tooltip.style.left = (ParentSize.width / 2 + ParentSize.x - Size.width / 2) + "px"
            Tooltip.style.top = (ParentSize.y - Size.height + document.documentElement.scrollTop - 2) + "px"
            document.getElementById("TooltipText2").classList.remove("TooltipInactiveSmall")
            document.getElementById("TooltipText2").classList.remove("TooltipInactive")
            document.getElementById("TooltipText2").classList.add("TooltipActiveSmall")
            document.getElementById("TooltipText2").classList.add("TooltipActive")
        })
        Curr.addEventListener("mouseleave", function () {
            document.getElementById("TooltipText2").classList.remove("TooltipActiveSmall")
            document.getElementById("TooltipText2").classList.remove("TooltipActive")
            document.getElementById("TooltipText2").classList.add("TooltipInactiveSmall")
            document.getElementById("TooltipText2").classList.add("TooltipInactive")
        })
    }
}
window.addEventListener("load", function () {
    SetupTooltips();
    SetupSmallTooltips();
})