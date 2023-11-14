function SetHue() {
    const Time = document.getElementsByTagName("html")[0].getAttribute("start");
    let StartDate = new Date(parseInt(Time))
    const WeekStart = new Date();
    WeekStart.setDate(WeekStart.getDate() - WeekStart.getDay());
    const MillisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    const HueProgress = ((StartDate - WeekStart) / MillisecondsInWeek) * 360;
    document.querySelector(':root').style.setProperty('--accent-color-hue', HueProgress);
}
SetHue()