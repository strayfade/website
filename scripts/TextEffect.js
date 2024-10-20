const GetElements = () => {
    return document.getElementsByClassName('decrypt-text')
}
const GenRng = (Median, Scale) => {
    return Math.random() * Scale + Median - (Scale / 2)
}
const Placement = async () => {
    const Phrases = [
        "What you fear loves you",
        "Sleep is overrated anyway",
        "Embrace your endless doubt",
        "Reality is just a suggestion",
        "Trust the darkness completely",
        "Silence speaks louder than truth",
        "Ignore your inner screams",
        "The shadows watch you back",
        "Perfection is perfectly impossible",
        "Worry keeps you alive",
        "Doubt your happiest moments",
        "Truth lies beneath the surface",
        "Comfort is your worst enemy",
        "Tomorrow never truly arrives",
        "Enjoy the creeping dread",
        "Fear is just another friend",
        "Your secrets know the truth",
        "Happiness is highly overrated",
        "Trust the whispers in darkness",
        "Ignore the ticking clock",
        "The end is just beginning",
        "Your thoughts betray you",
        "Every smile hides something darker",
        "The void is welcoming you",
        "Dreams are never just dreams",
        "Your fears keep you sane",
        "What you can't see waits",
        "Comfort is a cruel illusion",
        "You’re never truly alone",
        "You’re exactly where you shouldn’t be",
        "Don't trust your own reflection",
        "Breathe in the uncertainty",
        "Close your eyes forever",
        "The walls are listening closely",
        "Escape is just an illusion",
        "The truth lurks behind lies",
        "Believe your worst suspicions",
        "The unknown sees you clearly",
        "Pretend it's not happening",
        "Everything is absolutely normal",
        "Trust your deepest anxieties",
        "Embrace the sweet despair",
        "Keep walking toward the darkness",
        "You were meant to feel this",
        "Nothing is as it seems",
        "Contentment is just a distraction",
        "The end is closer now",
        "Control is a fleeting fantasy",
        "Your fears are very real",
        "Everything breaks eventually",
        "Stay in your comfort zone",
        "Listen to the silence screaming",
        "The darkness understands you better",
        "Confront your deepest terror",
        "Happiness is suspiciously fleeting",
        "Discomfort is perfectly natural",
        "Safety is highly questionable",
        "Doubt everything without question",
        "Embrace your inner chaos",
        "Normal is just a myth",
        "The future is always uncertain",
        "Nothing matters, but in a good way",
        "Panic is a natural instinct",
        "Your thoughts are not yours",
        "It's fine to be afraid",
        "The unknown is always watching",
        "Chaos loves your best efforts",
        "The nightmare never really ends",
        "Embrace the lurking dread",
        "The darkness hides your truth",
        "Run from your own shadow",
        "Sleep is a luxury now",
        "Your calm is a facade",
        "Welcome the creeping anxiety",
        "Nothing is truly controllable",
        "You’re falling in the right direction",
        "Expect the unexpected terrors",
        "Every step draws you closer",
        "Something watches from the void",
        "The answers only bring questions",
        "Shadows whisper your name",
        "Look away from your fears",
        "Nothing lasts, except uncertainty",
        "You're not losing your mind",
        "The unknown knows your thoughts",
        "The safest place is nowhere",
        "Your comfort zone is shrinking",
        "Only the darkness understands you",
        "Anxiety is just awareness",
        "The walls know your secrets",
        "Your paranoia is well-founded",
        "Everything is exactly wrong",
        "Fear keeps you grounded",
        "Brace for inevitable chaos"
    ]
    const JunkCont = document.getElementById("junk")
    if (JunkCont) {
        for (const i of Phrases) {
            let New = document.createElement("span")
            New.textContent = i
            New.className = "randomized"
            New.style.transform = `scaleY(${GenRng(30, 20)}%) scaleX(${GenRng(100, 100)}%)`
            New.style.left = `${GenRng(25, 50)}vw`
            New.style.top = `${GenRng(50, 100)}vh`
            New.style.opacity = `${GenRng(20, 75)}%`
            JunkCont.appendChild(New)
        }
        for (let i = 0; i < 500; i++) {
            let New = document.createElement("div")
            New.style.left = `${GenRng(50, 100)}vw`
            New.style.top = `${GenRng(50, 100)}vh`
            New.className = "dot"
            New.style.background = "black"
            JunkCont.appendChild(New)
        }
        for (let i = 0; i < 500; i++) {
            let New = document.createElement("div")
            New.style.left = `${GenRng(50, 100)}vw`
            New.style.top = `${GenRng(50, 100)}vh`
            New.className = "dot"
            New.style.background = "red"
            New.style.opacity = "0.2"
            JunkCont.appendChild(New)
        }
    }
}

const DecryptElements = async (Elements) => {
    for (let el = 0; el < Elements.length; el++) {
        Elements[el].style.transform = `scaleY(${GenRng(50, 20)}%) translate(${GenRng(0, 20)}px, ${GenRng(0, 20)}px)`
    }
}
function StartCountdown() {
    let targetTime = new Date(1731733200000)
    let countdownInterval = setInterval(() => {
        let nowTime = new Date(Date.now() + 1000 * 60 * 60);
        let timeDifference = targetTime - nowTime

        // Calculate days, hours, minutes, seconds, milliseconds
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        let milliseconds = timeDifference % 1000;

        // Display the countdown
        const MakePrecision = (int) => {
            if (int.toString().length == 1)
                return "0" + int
            return int
        }
        document.getElementById("counter-1").textContent = `${MakePrecision(days)}:${MakePrecision(hours)}:${MakePrecision(minutes)}:${MakePrecision(seconds)}.${milliseconds.toString()[0]}${milliseconds.toString()[1] ? milliseconds.toString()[1] : "0"}`
        document.getElementById("counter-2").textContent = `${MakePrecision(days)}:${MakePrecision(hours)}:${MakePrecision(minutes)}:${MakePrecision(seconds)}.${milliseconds.toString()[0]}${milliseconds.toString()[1] ? milliseconds.toString()[1] : "0"}`

        // Stop the countdown if the target date is reached
        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1);
}
document.addEventListener('DOMContentLoaded', async () => {
    await DecryptElements(GetElements())
    await Placement()
    StartCountdown();
})
