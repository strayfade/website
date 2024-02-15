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
