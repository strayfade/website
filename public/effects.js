const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
let width, height;

const divisions = 20;
const noiseSpeed = 10;
const noiseScale = 25;
let pointsXSpacing, pointsYSpacing
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    pointsXSpacing = Math.max(width, height) / divisions
    pointsYSpacing = Math.max(width, height) / divisions
    console.log(width, height)
    ctx.fillStyle = `white`;
}

window.addEventListener('resize', resize);
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
            drawBall(newCircleX, newCircleY, (perlinValue + 0.5) * (pointsXSpacing / 2) + (pointsXSpacing / 2))
        }
    }

    frameCount++;
    if (frameCount % 30 === 0) {
        perlin.clearMemory();
    }
}
setInterval(draw, 1);