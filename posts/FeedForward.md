{
"title": "AI vs. Anti-cheats",
"description": "Using a neural network to generate fake cursor movement",
"tags": ["Anti-cheat", "AI", "C++"],
"author": "Strayfade",
"date": "8/19/2024",
"showTitle": true,
"indexed": true,
"pinned": true
}

### Introduction

> The source code for this project can be found at [Strayfade/FNN](https://github.com/Strayfade/FNN).

Are "neural anti-cheats" like Valve's "VACnet" the solution to cheating in video games? Possibly. However, just as neural networks can be used by anti-cheat to detect cheaters, cheaters can use neural networks to avoid anti-cheat.

This article will be discussing how certain input methods, such as mouse movement, can be easily detected by anti-cheat software and how this problem can be solved through the use of input randomization and "humanization" through neural networks.

First, let's look at the flagship up-and-coming neural network anti-cheat by Valve, VACnet.

<img src="/assets/images/FeedForward1.png"/>
<p class="image-caption">The presumed patent for Valve's neural-network-based anti-cheat, VACnet</p>

By looking at [Valve's patent](https://patentimages.storage.googleapis.com/e5/80/ee/aadc4e252c6791/WO2019182868A1.pdf) for VACnet, lots of information can be revealed about the upcoming anti-cheat's inner workings. On [page 44](https://patentimages.storage.googleapis.com/e5/80/ee/aadc4e252c6791/WO2019182868A1.pdf#page=44), Valve displays some of the values forwarded through the network to determine the likelihood that a player is cheating. Notable values are `pitch` and `yaw`, which likely represent the direction that an in-game player's camera is facing.

<img src="/assets/images/FeedForward2.png"/>
<p class="image-caption">Example inputs given to the VACnet neural network anti-cheat software.</p>

When looking at the ways that anti-cheat software can detect cheating, one of the primary detection vectors has always been mouse movement. As such, *many* different anomalies related to mouse movement can trigger an anti-cheat, including but not limited to:

 - Mouse events being sent directly by the mouse don't align with in-game movements.
 - Mouse movements are unpredictable and erratic.
 - The mouse cursor moves extremely quickly and at unrealistic speeds.
 - The mouse cursor is being moved by an external program instead of directly by an input device.
 - A mouse movement event has a `LLMHF_INJECTED` (or similar) flag set to show it did not originate from a valid input device.
 - *and more!*

After looking at some of these detection vectors, one thing is immediately obvious: some of the vectors are determined by the computer itself (such as the `LLMHF_INJECTED` flag), and others seem like "common-sense" (we can call these **heuristic**) vectors. An example of a heuristic detection vector would be the cursor's speed greatly changing or moving erratically.

### What measures can be taken to prevent these detections?

Actually, a surprising amount can be done to prevent anti-cheat detection regarding mouse movement.

For detection vectors that are created by the computer itself, it is possible to manipulate the mouse events using a kernel-mode driver. A good example of this is [vsaint1's **kernel-mouse** repository on Github](https://github.com/vsaint1/kernel-mouse), which demonstrates a way to spoof legitimate, valid mouse events using a kernel-mode driver on Windows. 

This prevents the `LLMHF_INJECTED` flag from being appended to mouse events (such as those created using `SendInput`). Some lower-level anti-cheats, such as Vanguard by Riot Games, will outright reject mouse input if it contains the flag, meaning that nothing will happen in-game when using `SendInput`. Fortunately, `SendInput` is a Windows API relied on by many pieces of legitimate software (such as macro and accessibility software), so mouse movement should still *work* in most games, even if it means getting flagged by anti-cheat software.

### Heuristic vectors

Even if your movement source appears completely valid to a kernel-mode anti-cheat, the cursor's movements themselves might still trigger detections. If the cursor suddenly changes speed too quickly, moves at a constant speed, or moves at an exponentially decreasing speed (a sign of smoothing functions), then an advanced anti-cheat could still be triggered. 

Somewhat recently, players of Counter-Strike 2 learned that [by moving their cursor very quickly in-game, VACnet would be triggered](https://www.reddit.com/r/cs2/comments/17ea7wg/reproduceable_highdpi_vac_ban_bug/) and they would be banned from the server. This was likely due to VACnet being trained on many different types of cheats, including Spinbot, a notorious type of cheat that moves the player's in-game camera at very high speeds.

Of course, the solution to many of these heuristic detection vectors is to have the mouse input generated very carefully (or by a neural network) and in ways that look realistic heuristically. Ideally, a network could be trained on a highly skilled player's cursor movement patterns and recreate them in-game.

### Reaction time

[The average human reaction time is around 247ms.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4456887/) This is a problem because if the target location suddenly changes, an aimbot will nearly instantly begin moving the cursor in the target's new direction, while a human will take a minimum of 50-100ms to process the change.

It is, of course, possible to account for this by adding a delay or queueing system to the mouse movements being sent by a cheat, but this is one of many possible detection vectors that often goes overlooked. In the context of HID-based cursor movement, [an incredible post on the Unknown Cheats forum](https://www.unknowncheats.me/forum/3968927-post13.html) discusses even more heuristic vectors that could potentially be detected by anti-cheat software:

> *"I also think it'd be worth more of Vanguard's time to detect everyone, despite how good their mouse setup is, by simply looking for unrealistic aiming, reaction time, and stats, which I don't doubt they've already done extensively."*

In short, with some anti-cheats, you are much more likely to be banned based on an account trust system and suspicious **overall** gameplay. Remember that the best cheaters are already decent at the game.

If your cursor movements aren't smooth and realistic, though, chances are that you'll be banned much sooner than that.

### Writing a neural network for input "humanization"

When researching the steps that would be required to "humanize" computer-generated mouse movements, I first wrote a C++ program to capture and graph my mouse cursor's speed over time. This way, I would have a good reference for the ways that cursor speed naturally changes as the player moves their cursor towards a target position.

<img src="/assets/images/FeedForward3.png"/>
<p class="image-caption">The speed (Y) of my mouse cursor for various movement curves over time (X).</p>

The most important thing that this graph shows is that nearly every line follows an inverted-U curve (and even more importantly, with some **randomness** involved). The mouse has inertia, meaning that it takes time to reach its full speed, and then takes time to slow down.

When comparing this to the most widely-used smoothing function, differences are obvious. 

> `<em>f(x) = (t - x) / c + x</em>`
> 
> **_x_** represents the current location of the cursor (X or Y) and **_t_** represents the target coordinate.

Using this smoothing function, the speed curve would constantly be linearly decreasing. This is easily detectable by anti-cheat software when compared to the mouse cursor's natural speed.

<h3 style="text-align: center;">(this article is unlisted and a work-in-progress...)<h3>
<h3 style="text-align: center;">come back later!<h3>