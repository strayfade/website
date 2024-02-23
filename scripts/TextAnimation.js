let TextTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'em', 'strong', 'a', 'code']
let ReplacementLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

const GetElements = () => {
    let Output = []
    for (let x = 0; x < TextTags.length; x++) {
        let Found = document.getElementsByTagName(TextTags[x])
        for (let y = 0; y < Found.length; y++) {
            let HasEffectBox = false
            Found[y].style.willChange = 'content'
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
        const DecryptChance = 0.66
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
                Elements[x].style.filter = `blur(${Math.floor((1 - i / SavedStrings[x].length) * 5)}px)`
            }

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
    let Elements = GetElements()
    DecryptElements(Elements)
})
