document.querySelector(':root').style.setProperty('--transition-length', "1.0s");

document.documentElement.style.overflow = "hidden";
let PrevScrollDist = 0;
let InTransition = false
var SlideNum = 0;
const MaxSlides = 3;
const SlideIDs = ["Slide1", "Slide2", "Slide3"]
const SlideContentIDs = ["SlideContent1", "SlideContent2", "SlideContent3"]



function GoHome() {
  if (window.location.pathname == "/" || !window.location.pathname) {
    UpdateSlides(0)
  }
  else {
    window.location.href = "/"
  }
}
function UpdateSlides(SlideNumb) {
  SlideNum = SlideNumb;
  let Icons2 = document.getElementsByClassName("Footer")[0];
  switch (SlideNumb) {
    case 0:
      document.documentElement.style.backgroundColor = "white"
      document.getElementsByClassName("SidebarScrollPercentage")[0].style.backgroundColor = "rgba(0, 0, 0, 0.2)"
      document.getElementsByClassName("SidebarScrollFill")[0].style.backgroundColor = "var(--accent-color)"
      Icons2.style.opacity = "0.0"
      break;
    case 1:
      document.documentElement.style.backgroundColor = "var(--accent-color)"
      document.getElementsByClassName("SidebarScrollPercentage")[0].style.backgroundColor = "rgba(0, 0, 0, 0.2)"
      document.getElementsByClassName("SidebarScrollFill")[0].style.backgroundColor = "rgba(255, 255, 255, 1)"
      Icons2.style.opacity = "0.0"
      break;
    case 2:
      document.documentElement.style.backgroundColor = "black"
      document.getElementsByClassName("SidebarScrollPercentage")[0].style.backgroundColor = "rgba(255, 255, 255, 0.2)"
      document.getElementsByClassName("SidebarScrollFill")[0].style.backgroundColor = "rgba(255, 255, 255, 1)"
      Icons2.style.opacity = "1.0"
      break;
  }
  document.getElementsByClassName("SidebarScrollFill")[0].style.height = (((SlideNum + 1) / MaxSlides) * 100) + "%"
  let Icons = document.getElementsByClassName("Icon");
  for (let i = 0; i < Icons.length; i++) {
    switch (SlideNumb) {
      case 0:
        Icons[i].classList.add("Coloring1")
        Icons[i].classList.remove("Coloring2")
        Icons[i].classList.remove("Coloring3")
        Icons2.classList.add("Coloring1")
        Icons2.classList.remove("Coloring2")
        Icons2.classList.remove("Coloring3")
        break;
      case 1:
        Icons[i].classList.remove("Coloring1")
        Icons[i].classList.add("Coloring2")
        Icons[i].classList.remove("Coloring3")
        Icons2.classList.remove("Coloring1")
        Icons2.classList.add("Coloring2")
        Icons2.classList.remove("Coloring3")
        break;
      case 2:
        Icons[i].classList.remove("Coloring1")
        Icons[i].classList.remove("Coloring2")
        Icons[i].classList.add("Coloring3")
        Icons2.classList.remove("Coloring1")
        Icons2.classList.remove("Coloring2")
        Icons2.classList.add("Coloring3")
        break;
    }
  }
  let MoveTargets = []
  let UnmoveTargets = [];
  let ContentMoveTargets = []
  let ContentUnmoveTargets = [];
  ContentMoveTargets.push(SlideContentIDs[SlideNumb])
  MoveTargets.push(SlideIDs[SlideNumb])
  for (let i = 0; i < MaxSlides; i++) {
    if (i == SlideNumb) continue;
    UnmoveTargets.push(SlideIDs[i])
    ContentUnmoveTargets.push(SlideContentIDs[i])
  }
  MoveTargets.forEach(function (item) {
    let Element = document.getElementById(item);
    Element.classList.remove("SlideViewed")
    Element.classList.remove("SlideNotViewed")
    Element.classList.add("SlideVisible")
  })
  UnmoveTargets.forEach(function (item) {
    let Element = document.getElementById(item);
    Element.classList.remove("SlideVisible")
    Element.classList.remove("SlideViewed")
    Element.classList.remove("SlideNotViewed")
    Element.classList.add(UnmoveTargets.indexOf(item) < (SlideNumb) ? "SlideViewed" : "SlideNotViewed")
  })
  ContentMoveTargets.forEach(function (item) {
    let Element = document.getElementById(item);
    Element.classList.remove("SlideContentHidden")
    Element.classList.add("SlideContentVisible")
  })
  ContentUnmoveTargets.forEach(function (item) {
    let Element = document.getElementById(item);
    Element.classList.add("SlideContentHidden")
    Element.classList.remove("SlideContentVisible")
  })
}

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

if (window.location.pathname == "/" || !window.location.pathname) {
  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; }
    }));
  } catch (e) { }

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  // call this to Disable
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);

  window.addEventListener("wheel", async function (event) {
    let ScrollUpdate = event.deltaY - PrevScrollDist
    PrevScrollDist == event.deltaY;
    if (Math.abs(ScrollUpdate) > 10) {
      if (!InTransition) {
        let NewSlideNum = SlideNum + ((ScrollUpdate > 0) ? 1 : -1);
        if (NewSlideNum >= 0 && NewSlideNum < MaxSlides) {
          InTransition = true;
          SlideNum = NewSlideNum;
          UpdateSlides(SlideNum)
          await new Promise(r => setTimeout(r, 1000));
          InTransition = false;
        }
      }
    }
  });
}
else {
  document.getElementsByClassName("SidebarScrollPercentage")[0].style.display = "none"
  document.getElementsByClassName("SidebarScrollFill")[0].style.display = "none"
}