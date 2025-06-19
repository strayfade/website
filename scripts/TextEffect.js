const GetElements = () => {
    let Output = []
    let Found = document.getElementsByClassName('decrypt-text')
    for (let y = 0; y < Found.length; y++) {
        Found[y].style.willChange = 'content'
        if (Found[y].children.length == 2) {
            if (Found[y].textContent != '') {
                Output.push(Found[y])
            }
        }
    }
    return Output
}

const DecryptElements = async (Elements) => {
    let SavedStrings = []
    let InitialStrings = []

    for (let x = 0; x < Elements.length; x++) {
        let FoundString = Elements[x].getAttribute("decrypted")
        SavedStrings.push(FoundString)
        InitialStrings.push(Elements[x].textContent)
        Elements[x].removeAttribute("decrypted")
    }

    let LongestString = 0
    for (let x = 0; x < SavedStrings.length; x++) {
        if (SavedStrings[x].length > LongestString) LongestString = SavedStrings[x].length
    }

    const DecryptLoop = async () => {
        let Charset = "ZYTSPLJIFEBzyxvtsrlkjifeca"; // These are the thinner-width characters of the alphabet (i chose an arbitrary max width)
        Charset += `............................`
        for (let el = 0; el < Elements.length; el++) {
            await new Promise(r => setTimeout(r, 50));
            (async () => {
                // Iterate through string
                for (let i = 0; i < SavedStrings[el].length; i++) {

                    // Build new string
                    let NewString = ""
                    for (let x = 0; x < SavedStrings[el].length; x++) {
                        if (x == i) {
                            NewString += `<span style="border: 1px dashed var(--foreground); color: var(--background); padding: 1px;">`
                            NewString += SavedStrings[el][x];
                            NewString += `</span>`
                        }
                        else if (x < i) {
                            NewString += SavedStrings[el][x]
                        }
                        else if (x > i + SavedStrings[el].length / 2) {
                            NewString += InitialStrings[el][x]
                        }
                        else {
                            NewString += Charset[Math.floor(Math.random() * Charset.length)]
                        }
                    }

                    // Update element
                    Elements[el].innerHTML = NewString

                    // Wait
                    const TimeoutLength = Math.pow(i / SavedStrings[el].length, 3) * 10
                    await new Promise(r => setTimeout(r, TimeoutLength));
                }
                Elements[el].innerHTML = SavedStrings[el]
            })()
        }
    }
    await DecryptLoop()
}

document.addEventListener('DOMContentLoaded', async () => {
    let Elements = GetElements()
    DecryptElements(Elements)
})
