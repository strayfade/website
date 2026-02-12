const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
let width, height;

const divisions = 20;
const noiseSpeed = 7.5;
const noiseScale = 25;
let pointsXSpacing, pointsYSpacing
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    pointsXSpacing = Math.max(width, height) / divisions
    pointsYSpacing = Math.max(width, height) / divisions
    ctx.fillStyle = `white`;
}

//window.addEventListener('resize', resize);
resize();

perlin.seed();

let frameCount = 0;

const drawBall = (x, y, size) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

ctx.fillStyle = `white`;
const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const time = Date.now();
    for (let x = -pointsXSpacing; x <= width + pointsXSpacing; x += pointsXSpacing) {
        for (let y = -pointsYSpacing; y <= height + pointsYSpacing; y += pointsYSpacing) {
            const percentPosition = [
                x / width,
                y / height
            ]
            const perlinValue = perlin.get(
                (percentPosition[0] * noiseScale + (time / 500) % 500) / noiseSpeed,
                (percentPosition[1] * noiseScale + (time / 500) % 500) / noiseSpeed
            );
            let newCircleX = (width * percentPosition[0]) + perlinValue * 50;
            let newCircleY = (height * percentPosition[1]) + perlinValue * 50;
            drawBall(newCircleX, newCircleY, (perlinValue + 0.75) * (pointsXSpacing / 2) + (pointsXSpacing / 2))
        }
    }

    frameCount++;
    if (frameCount % 30 === 0) {
        perlin.clearMemory();
    }
}
setInterval(draw, 1);

const dropdowns = document.getElementsByClassName("dropdown")
for (let d = 0; d < dropdowns.length; d++) {
    const x = dropdowns[d]
    x.addEventListener("click", (e) => {
        const x2 = x;
        const containerElements = x2.parentElement.children;
        for (i in containerElements) {
            if (containerElements[i] == x2) {
                const nextSibling = containerElements[parseInt(i) + 1]
                if (nextSibling.classList.contains("dropdown-visible"))
                    nextSibling.classList.remove("dropdown-visible")
                else
                    nextSibling.classList.add("dropdown-visible")
                console.log(x2.style)
                x2.style.listStyle = (x2.style.listStyle == "disclosure-open") ? "disclosure-closed" : "disclosure-open"
            }
        }
    })
}