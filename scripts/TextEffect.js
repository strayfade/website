const GetElements = () => {
    let Output = []
    let Found = document.getElementsByClassName('decrypt-text')
    for (let y = 0; y < Found.length; y++) {
        Found[y].style.willChange = 'content'
        if (Found[y].children.length == 0) {
            if (Found[y].textContent != '') {
                Output.push(Found[y])
            }
        }
    }
    return Output
}

const DecryptElements = (Elements) => {
    let SavedStrings = []

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
        const DecryptChance = 0.25
        let Charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        Charset += `▓▒░`
        Charset += `____________________________`
        Charset += `............................`
        setTimeout(() => {
            for (let x = 0; x < Elements.length; x++) {
                let NewString = ''
                for (let y = 0; y < SavedStrings[x].length; y++) {
                    let Index = Math.floor(Math.random() * 255)
                    if (y == i) {
                        NewString += `<span style="border: 1px dashed white; color: var(--background); padding: 1px;">`
                        NewString += SavedStrings[x][y];//''[Math.floor(Math.random() * 4)]
                        NewString += `</span>`
                    } else if (y < i) {
                        NewString += SavedStrings[x][y]
                    } else {
                        //NewString += SavedStrings[x][y]
                        NewString += Charset[Math.floor(Math.random() * Charset.length)]
                    }
                }
                Elements[x].innerHTML = NewString
                //Elements[x].style.filter = `blur(${Math.min(1, Math.max(0, (1 - (i / SavedStrings[x].length)))) * 5}px)`
            }

            if (Math.random() < DecryptChance) {
                Iter++
            }
            if (Iter < LongestString + 1) {
                DecryptLoop(Iter)
            }
        }, 10)
    }
    DecryptLoop(0)
}

document.addEventListener('DOMContentLoaded', async () => {
    let Elements = GetElements()
    DecryptElements(Elements)
})
