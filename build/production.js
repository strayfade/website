const SetHue = () => {
    const HueProgress = (new Date(Date.now()).getMinutes() / 60) * 360
    document.querySelector(':root').style.setProperty('--accent-color-hue', HueProgress)
}

SetHue()
setInterval(SetHue, 1)


if (window.location.pathname != '/') {
    let Elements = document.getElementsByTagName('img')
    for (let x = 0; x < Elements.length; x++) {
        Elements[x].parentElement.style.textAlign = 'center'
    }
}


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


// Credit https://stackoverflow.com/questions/43043113/how-to-force-reloading-a-page-when-using-browser-back-button
window.addEventListener('pageshow', (event) => {
    let historyTraversal =
        event.persisted || (typeof window.performance != 'undefined' && window.performance.navigation.type === 2)
    if (historyTraversal) {
        // Handle page restore.
        window.location.reload()
    }
})


let LoadingScreen = document.getElementById('LoadingScreen')

let AllElements = document.body.getElementsByTagName('*')
for (let x = 0; x < AllElements.length; x++) {
    if (AllElements[x].hasAttribute('href')) {
        const oHref = AllElements[x].getAttribute('href')
        let Domain = oHref.split('://').pop().split('/')[0]
        if (Domain === 'strayfade.com' || Domain === '') {
            AllElements[x].removeAttribute('href')
            AllElements[x].style.cursor = 'pointer'
            AllElements[x].addEventListener('click', async () => {
                await PlaceLoadingBuffer()
                window.location.href = oHref
            })
        }
    }
}

const PlaceLoadingBuffer = async () => {
    LoadingScreen.classList.add('LoadingScreenVisible')
    await new Promise((r) => setTimeout(r, 150))
}
const ClearLoadingBuffer = async () => {
    await new Promise((r) => setTimeout(r, 150))
    LoadingScreen.classList.remove('LoadingScreenVisible')
}
ClearLoadingBuffer()


document.documentElement.style.overflow = 'hidden'
let PrevScrollDist = 0
let InTransition = false
let SlideNum = 0
const MaxSlides = 3
const SlideIDs = ['Slide1', 'Slide2', 'Slide3']
const SlideContentIDs = ['SlideContent1', 'SlideContent2', 'SlideContent3']

const GoUp = () => {
    if (SlideNum == 1 || SlideNum == 2) UpdateSlides(SlideNum - 1)
}
const GoDown = () => {
    if (SlideNum == 0 || SlideNum == 1) UpdateSlides(SlideNum + 1)
}
const GoHome = () => {
    if (window.location.pathname == '/' || !window.location.pathname) {
        UpdateSlides(0)
    } else {
        window.location.href = '/'
    }
}
const UpdateSlides = (SlideNumb) => {
    SlideNum = SlideNumb
    let Icons2 = document.getElementsByClassName('Footer')[0]
    let Icons3 = document.getElementsByClassName('Footer2')[0]
    let Icons4 = document.getElementsByClassName('MobileButton')[0]
    let Icons5 = document.getElementsByClassName('MobileButton')[1]
    let Slide1Elements = document.getElementsByClassName('Slide1')
    let Slide2Elements = document.getElementsByClassName('Slide2')
    let Slide3Elements = document.getElementsByClassName('Slide3')
    switch (SlideNumb) {
        case 0:
            document.documentElement.style.backgroundColor = 'black'
            document.getElementsByClassName('SidebarScrollPercentage')[0].style.backgroundColor =
                'rgba(255, 255, 255, 0.2)'
            document.getElementsByClassName('SidebarScrollFill')[0].style.backgroundColor = 'var(--accent-color)'
            Icons2.style.opacity = '0.0'
            Icons3.style.opacity = '1.0'
            Icons3.style.pointerEvents = 'all'
            Icons4.style.opacity = '1.0'
            Icons5.style.opacity = '0.0'
            for (let x = 0; x < Slide1Elements.length; x++) {
                Slide1Elements[x].classList.add('Slide1Visible')
            }
            for (let x = 0; x < Slide2Elements.length; x++) {
                Slide2Elements[x].classList.remove('Slide2Visible')
            }
            for (let x = 0; x < Slide3Elements.length; x++) {
                Slide3Elements[x].classList.remove('Slide3Visible')
            }
            break
        case 1:
            document.documentElement.style.backgroundColor = 'var(--accent-color)'
            document.getElementsByClassName('SidebarScrollPercentage')[0].style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
            document.getElementsByClassName('SidebarScrollFill')[0].style.backgroundColor = 'rgba(255, 255, 255, 1)'
            Icons2.style.opacity = '0.0'
            Icons3.style.opacity = '1.0'
            Icons3.style.pointerEvents = 'all'
            Icons4.style.opacity = '1.0'
            Icons5.style.opacity = '1.0'
            for (let x = 0; x < Slide1Elements.length; x++) {
                Slide1Elements[x].classList.remove('Slide1Visible')
            }
            for (let x = 0; x < Slide2Elements.length; x++) {
                Slide2Elements[x].classList.add('Slide2Visible')
            }
            for (let x = 0; x < Slide3Elements.length; x++) {
                Slide3Elements[x].classList.remove('Slide3Visible')
            }
            const CalculateAge = () => {
                let AgeDif = new Date(Date.now() - new Date(1131950100000))
                return Math.abs(AgeDif.getUTCFullYear() - 1970)
            }
            const SetYearsCoded = (i) => {
                setTimeout(() => {
                    if (i < 0) return
                    document.getElementById('Counter').innerHTML =
                        (new Date().getFullYear() - 2016 - i).toString() + '+'
                    SetYearsCoded(--i)
                }, 200)
            }
            SetYearsCoded(CalculateAge() - 11)
            break
        case 2:
            document.documentElement.style.backgroundColor = 'black'
            document.getElementsByClassName('SidebarScrollPercentage')[0].style.backgroundColor =
                'rgba(255, 255, 255, 0.2)'
            document.getElementsByClassName('SidebarScrollFill')[0].style.backgroundColor = 'rgba(255, 255, 255, 1)'
            Icons2.style.opacity = '1.0'
            Icons3.style.opacity = '0.0'
            Icons3.style.pointerEvents = 'none'
            Icons4.style.opacity = '0.0'
            Icons5.style.opacity = '1.0'
            for (let x = 0; x < Slide1Elements.length; x++) {
                Slide1Elements[x].classList.remove('Slide1Visible')
            }
            for (let x = 0; x < Slide2Elements.length; x++) {
                Slide2Elements[x].classList.remove('Slide2Visible')
            }
            for (let x = 0; x < Slide3Elements.length; x++) {
                Slide3Elements[x].classList.add('Slide3Visible')
            }
            break
    }
    document.getElementsByClassName('SidebarScrollFill')[0].style.height = ((SlideNum + 1) / MaxSlides) * 100 + '%'
    let Icons = document.getElementsByClassName('Icon')
    for (let i = 0; i < Icons.length; i++) {
        switch (SlideNumb) {
            case 0:
                Icons[i].classList.add('Coloring1')
                Icons[i].classList.remove('Coloring2')
                Icons[i].classList.remove('Coloring3')
                Icons2.classList.add('Coloring1')
                Icons2.classList.remove('Coloring2')
                Icons2.classList.remove('Coloring3')
                Icons3.classList.add('Coloring1')
                Icons3.classList.remove('Coloring2')
                Icons3.classList.remove('Coloring3')
                Icons4.classList.add('Coloring1')
                Icons4.classList.remove('Coloring2')
                Icons4.classList.remove('Coloring3')
                break
            case 1:
                Icons[i].classList.remove('Coloring1')
                Icons[i].classList.add('Coloring2')
                Icons[i].classList.remove('Coloring3')
                Icons2.classList.remove('Coloring1')
                Icons2.classList.add('Coloring2')
                Icons2.classList.remove('Coloring3')
                Icons3.classList.remove('Coloring1')
                Icons3.classList.add('Coloring2')
                Icons3.classList.remove('Coloring3')
                Icons4.classList.remove('Coloring1')
                Icons4.classList.add('Coloring2')
                Icons4.classList.remove('Coloring3')
                Icons5.classList.remove('Coloring1')
                Icons5.classList.add('Coloring2')
                Icons5.classList.remove('Coloring3')
                break
            case 2:
                Icons[i].classList.remove('Coloring1')
                Icons[i].classList.remove('Coloring2')
                Icons[i].classList.add('Coloring3')
                Icons2.classList.remove('Coloring1')
                Icons2.classList.remove('Coloring2')
                Icons2.classList.add('Coloring3')
                Icons3.classList.remove('Coloring1')
                Icons3.classList.remove('Coloring2')
                Icons3.classList.add('Coloring3')
                Icons4.classList.remove('Coloring1')
                Icons4.classList.remove('Coloring2')
                Icons4.classList.add('Coloring3')
                Icons5.classList.remove('Coloring1')
                Icons5.classList.remove('Coloring2')
                Icons5.classList.add('Coloring3')
                break
        }
    }
    let MoveTargets = []
    let UnmoveTargets = []
    let ContentMoveTargets = []
    let ContentUnmoveTargets = []
    ContentMoveTargets.push(SlideContentIDs[SlideNumb])
    MoveTargets.push(SlideIDs[SlideNumb])
    for (let i = 0; i < MaxSlides; i++) {
        if (i == SlideNumb) continue
        UnmoveTargets.push(SlideIDs[i])
        ContentUnmoveTargets.push(SlideContentIDs[i])
    }
    MoveTargets.forEach((item) => {
        let Element = document.getElementById(item)
        Element.classList.remove('SlideViewed')
        Element.classList.remove('SlideNotViewed')
        Element.classList.add('SlideVisible')
    })
    UnmoveTargets.forEach((item) => {
        let Element = document.getElementById(item)
        Element.classList.remove('SlideVisible')
        Element.classList.remove('SlideViewed')
        Element.classList.remove('SlideNotViewed')
        Element.classList.add(UnmoveTargets.indexOf(item) < SlideNumb ? 'SlideViewed' : 'SlideNotViewed')
    })
    ContentMoveTargets.forEach((item) => {
        let Element = document.getElementById(item)
        Element.classList.remove('SlideContentHidden')
        Element.classList.add('SlideContentVisible')
    })
    ContentUnmoveTargets.forEach((item) => {
        let Element = document.getElementById(item)
        Element.classList.add('SlideContentHidden')
        Element.classList.remove('SlideContentVisible')
    })
}

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 }
const PreventDefault = (e) => {
    e.preventDefault()
}

const PreventDefaultForScrollKeys = (e) => {
    if (keys[e.keyCode]) {
        PreventDefault(e)
        return false
    }
}

if (window.location.pathname == '/' || !window.location.pathname) {
    // Scroll to location
    UpdateSlides(0)
    let Slide = new URLSearchParams(window.location.search).get('p')
    if (Slide) {
        switch (Slide.toLowerCase()) {
            case 'skills':
                UpdateSlides(1)
                break
            case 'contact':
                UpdateSlides(2)
                break
        }
    }
    // modern Chrome requires { passive: false } when adding events
    let supportsPassive = false
    try {
        window.addEventListener(
            'test',
            null,
            Object.defineProperty({}, 'passive', {
                get: () => {
                    supportsPassive = true
                },
            }),
        )
    } catch (e) {}

    let wheelOpt = supportsPassive ? { passive: false } : false
    let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

    window.addEventListener('DOMMouseScroll', PreventDefault, false) // Older Firefox versions
    window.addEventListener(wheelEvent, PreventDefault, wheelOpt) // Desktop
    window.addEventListener('touchmove', PreventDefault, wheelOpt) // Mobile (?)
    window.addEventListener('keydown', PreventDefaultForScrollKeys, false)

    window.addEventListener('wheel', async (event) => {
        let ScrollUpdate = event.deltaY - PrevScrollDist
        PrevScrollDist == event.deltaY
        if (Math.abs(ScrollUpdate) > 10) {
            if (!InTransition) {
                let NewSlideNum = SlideNum + (ScrollUpdate > 0 ? 1 : -1)
                if (NewSlideNum >= 0 && NewSlideNum < MaxSlides) {
                    InTransition = true
                    SlideNum = NewSlideNum
                    UpdateSlides(SlideNum)
                    await new Promise((r) => setTimeout(r, 1000))
                    InTransition = false
                }
            }
        }
    })
} else {
    document.getElementsByClassName('SidebarScrollPercentage')[0].style.display = 'none'
    document.getElementsByClassName('SidebarScrollFill')[0].style.display = 'none'
    document.getElementsByClassName('Footer')[0].style.display = 'none'
    document.getElementsByClassName('Footer2')[0].style.display = 'none'
}

document.getElementById('SlideContent1').classList.add('SlideNotOccluded')


if (window.location.pathname != '/') {
    let Elems = [document.getElementById('SidebarMain'), document.getElementsByClassName('Header')[0]]
    Elems.forEach((Elem) => {
        Elem.classList.add('ScrollAffectable')
    })
    const Scrollable = document.getElementsByClassName('Scrollable')[0]
    Scrollable.addEventListener('scroll', () => {
        let ScrollDistance = Scrollable.scrollTop
        Elems.forEach((CurrentElement) => {
            if (ScrollDistance > 0) {
                CurrentElement.classList.add('ScrollLowOpacity')
            } else {
                CurrentElement.classList.remove('ScrollLowOpacity')
            }
        })
    })
}


let TextTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'em', 'strong', 'a', 'code']
let ReplacementLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

const GetElements = () => {
    let Output = []
    for (let x = 0; x < TextTags.length; x++) {
        let Found = document.getElementsByTagName(TextTags[x])
        for (let y = 0; y < Found.length; y++) {
            let HasEffectBox = false
            for (let z = 0; z < Found[y].children.length; z++) {
                if (Found[y].children[z].classList.contains('EffectBox')) HasEffectBox = true
            }
            if (Found[y].children.length == 0 || (HasEffectBox && Found[y].children.length == 1)) {
                if (Found[y].innerHTML != '') {
                    if (Found[y].innerHTML.split('<div class=')[0].toString().length < 25) {
                        Output.push(Found[y])
                    }
                }
            }
        }
    }
    return Output
}

let SavedStrings = []

const DecryptElements = (Elements) => {
    for (let x = 0; x < Elements.length; x++) {
        let FoundString = Elements[x].innerHTML.split('<div class=')[0].toString()
        SavedStrings.push(FoundString)
    }

    let LongestString = 0
    for (let x = 0; x < SavedStrings.length; x++) {
        if (SavedStrings[x].length > LongestString) LongestString = SavedStrings[x].length
    }

    let Iter = 0

    const DecryptLoop = (i) => {
        setTimeout(() => {
            for (let x = 0; x < Elements.length; x++) {
                let NewString = ''
                for (let y = 0; y < SavedStrings[x].length; y++) {
                    let Index = Math.floor(Math.random() * ReplacementLetters.length)
                    if (y == i) {
                        NewString += '█'
                    } else if (y < i) {
                        NewString += SavedStrings[x][y]
                    } else {
                        NewString += ReplacementLetters[Index]
                    }
                }
                Elements[x].innerHTML = NewString
            }

            let DecryptChance = 0.33
            if (Math.random() < DecryptChance) {
                // Chance of decrypting
                Iter++
            }
            if (Iter < LongestString + 1) {
                DecryptLoop(Iter)
            }
        }, 20)
    }
    DecryptLoop(0)
}

document.addEventListener('DOMContentLoaded', async () => {
    //let Elements = GetElements()
    //DecryptElements(Elements)
})


const SetupTooltips = () => {
    const El = document.querySelectorAll('[data-tooltip]')
    let Tooltip = document.getElementById('TooltipText')
    for (let x = 0; x < El.length; x++) {
        let Curr = El[x]
        Curr.addEventListener('mouseover', () => {
            document.getElementById('TooltipText').innerHTML = Curr.getAttribute('data-tooltip')
            let Size = Tooltip.getBoundingClientRect()
            let ParentSize = Curr.getBoundingClientRect()
            Tooltip.style.left = ParentSize.width + ParentSize.x + 5 + 'px'
            Tooltip.style.top = ParentSize.height / 2 + ParentSize.y - Size.height - 4 + 'px'
            document.getElementById('TooltipText').classList.remove('TooltipInactive')
            document.getElementById('TooltipText').classList.add('TooltipActive')
        })
        Curr.addEventListener('mouseleave', () => {
            document.getElementById('TooltipText').classList.remove('TooltipActive')
            document.getElementById('TooltipText').classList.add('TooltipInactive')
        })
    }
    Tooltip.addEventListener('mouseleave', () => {
        document.getElementById('TooltipText').classList.remove('TooltipActive')
        document.getElementById('TooltipText').classList.add('TooltipInactive')
    })
    Tooltip.addEventListener('mouseover', () => {
        document.getElementById('TooltipText').classList.remove('TooltipInactive')
        document.getElementById('TooltipText').classList.add('TooltipActive')
    })
}

const SetupSmallTooltips = () => {
    const El = document.querySelectorAll('[data-tooltipsmall]')
    for (let x = 0; x < El.length; x++) {
        let Curr = El[x]
        Curr.style.cursor = 'pointer'
        Curr.addEventListener('mouseover', () => {
            document.getElementById('TooltipText2').innerHTML = Curr.getAttribute('data-tooltipsmall')
            let Tooltip = document.getElementById('TooltipText2')
            let Size = Tooltip.getBoundingClientRect()
            let ParentSize = Curr.getBoundingClientRect()
            Tooltip.style.left = ParentSize.width / 2 + ParentSize.x - Size.width / 2 + 'px'
            Tooltip.style.top = ParentSize.y - Size.height + document.documentElement.scrollTop - 2 + 'px'
            document.getElementById('TooltipText2').classList.remove('TooltipInactiveSmall')
            document.getElementById('TooltipText2').classList.remove('TooltipInactive')
            document.getElementById('TooltipText2').classList.add('TooltipActiveSmall')
            document.getElementById('TooltipText2').classList.add('TooltipActive')
        })
        Curr.addEventListener('mouseleave', () => {
            document.getElementById('TooltipText2').classList.remove('TooltipActiveSmall')
            document.getElementById('TooltipText2').classList.remove('TooltipActive')
            document.getElementById('TooltipText2').classList.add('TooltipInactiveSmall')
            document.getElementById('TooltipText2').classList.add('TooltipInactive')
        })
    }
}
window.addEventListener('load', () => {
    SetupTooltips()
    SetupSmallTooltips()
})


