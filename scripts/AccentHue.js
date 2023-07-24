const StartTimestamp = document.getElementsByTagName("html")[0].getAttribute("start");
const ServerClientOffset = new Date().getTime() - new Date(parseInt(StartTimestamp)).getTime();
function SetHue() {
    const CurrentTime = new Date(new Date().getTime() + new Date(ServerClientOffset).getTime());
    const HueProgress = (CurrentTime.getMinutes() / 60) * 360;
    document.querySelector(':root').style.setProperty('--accent-color-hue', HueProgress);
}

SetHue();
setInterval(SetHue, 100);