import './RadialGradient.css'
function RadialGradient() {
    const diameter = Math.random() * 300 + 1000
    let screenDirection = Math.floor(Math.random() * 3.99999)
    let leftPos = 0
    let topPos = 0
    let bounds = {
        minX: -diameter / 2,
        minY: -diameter / 2,
        maxX: window.innerWidth - diameter / 2,
        maxY: window.window.innerHeight - diameter / 2,
    }
    const lerp = (a, b, alpha) => {
        return (b - a) * alpha + a
    }
    const mod = diameter / 4
    switch (screenDirection) {
        case 0:
            leftPos = lerp(bounds.minX, bounds.maxX, Math.random())
            topPos = bounds.minY - mod
            break
        case 1:
            leftPos = bounds.maxX + mod
            topPos = lerp(bounds.minY, bounds.maxY, Math.random())
            break
        case 2:
            leftPos = lerp(bounds.minX, bounds.maxX, Math.random())
            topPos = bounds.maxY + mod
            break
        case 3:
            leftPos = bounds.minX - mod
            topPos = lerp(bounds.minY, bounds.maxY, Math.random())
            break
        default:
            break
    }
    const style = {
        width: `${diameter}px`,
        height: `${diameter}px`,
        left: leftPos,
        top: topPos,
    }
    return <div className='radial-gradient' style={style} />
}
export default RadialGradient
