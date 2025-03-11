{
"title": "dreamhook",
"description": "Inhibiting my dreams so that I get some sleep",
"tags": ["Neurology", "Electronics", "Programming"],
"author": "strayfade",
"date": "3/11/2025",
"showTitle": true,
"indexed": false,
"disableHighlighting": false,
"pinned": false
}

### The Problem
*I have had some trouble sleeping recently.* It's well-known that many drowsiness or sleeping aids such as melatonin [can lead to an increase in brain activity during sleep](https://health.clevelandclinic.org/does-melatonin-cause-bad-dreams), which usually triggers dreams. I noticed this myself when I started having 3-5 dreams per night at times when I had taken the recommended amount of melatonin. As you can imagine, this is pretty annoying.

### The Solution
Coincidentally, at the time when I started having too many dreams, I was working with an electroencephalogram (EEG) module manufactured by NeuroSky, which is commonly used for brain wave analysis. I had obtained one of these modules by salvaging it from a [Mattel MindFlex](https://en.wikipedia.org/wiki/Mindflex) headset, and had been using it to experiement with brain waves by doing things such as blinking a LED or controlling a relay.

*Do you see where I'm going with this?*

Theoretically, it should be easy to detect when a person is dreaming by using an EEG headset simply by observing the change in brain waves. First, though, I needed some sample data. I had been using an ESP32-C3 to read the serial data coming from the NeuroSky chip, and I could use that same ESP32 to send a log of that data to my computer.