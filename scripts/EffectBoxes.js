;(async () => {
    const AffectedElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    let Elements = []
    for (const TagName of AffectedElements)
        for (const Element of document.getElementsByTagName(TagName)) Elements.push(Element)

    // Add effect boxes
    for (const Element of Elements) {
        // Get positions
        const SavedWidth = Element.style.width
        const SavedPadding = Element.style.padding
        Element.style.width = 'max-content'
        Element.style.padding = '0px'
        const ElementLocation = Element.getBoundingClientRect()
        Element.style.width = SavedWidth
        Element.style.padding = SavedPadding

        let EffectBox = document.createElement('div')
        EffectBox.classList.add('CoverBox')
        EffectBox.style.top = '-' + ElementLocation.top + 'px'
        EffectBox.style.right = '0px'
        EffectBox.style.width = ElementLocation.right - ElementLocation.left + 'px'
        EffectBox.style.height = ElementLocation.bottom - ElementLocation.top + 'px'
        EffectBox.style.marginTop = '-' + (ElementLocation.bottom - ElementLocation.top) + 'px'
        EffectBox.setAttribute('initialwidth', ElementLocation.right - ElementLocation.left)
        Element.appendChild(EffectBox)
    }

    // Animate effect boxes
    document.querySelector(':root').style.setProperty('--transition-length', '0.75s')

    let AllBoxes = []
    for (const Box of document.getElementsByClassName('CoverBox')) {
        AllBoxes.push(Box)
    }
    const min = (a) => {
        return a < -1 ? -1 : a
    }
    const max = (a) => {
        return a > 1 ? 1 : a
    }
    const clamp = (a) => {
        return min(max(a))
    }
    AllBoxes.sort(
        (a, b) =>
            (1 - document.getElementById('SlideContent1').contains(a)) *
            clamp(a.getBoundingClientRect().top - b.getBoundingClientRect().top),
    )
    let Iterator = 0
    const ref = setInterval(() => {
        AllBoxes[Iterator].style.marginRight = parseInt(AllBoxes[Iterator].getAttribute('initialwidth')) + 'px'
        AllBoxes[Iterator].style.width = '0px'
        Iterator++
        if (Iterator == AllBoxes.length) {
            clearInterval(ref)
            setTimeout(() => {
                for (const Box of document.getElementsByClassName('CoverBox')) {
                    //Box.remove()
                }
            }, 1000)
        }
    }, 100)
})()
