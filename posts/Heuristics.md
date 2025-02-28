{
"title": "Cheat vs. Anti-cheat",
"description": "Learning heuristic detection vectors to make smarter cheats (and anti-cheats)",
"tags": ["Anti-cheat", "Math", "C++"],
"author": "strayfade",
"date": "8/19/2024",
"showTitle": true,
"indexed": false,
"pinned": true
}

> This document will explain the importance of correctly implemented heuristic detection vectors in anti-cheat software. Furthermore, the document explores ways that these detection vectors could be evaded by video game cheats, primarily by generating human-looking mouse movement curves using neural networks.

### Introduction

With video game cheats becoming more and more advanced each day, many anti-cheat solutions are generally failing to keep up. This could be due to technical limitations, such as with elevated priviliges being required to detect almost all low-level cheats. Additionally, the failure to develop better anti-cheat software could be due to the privacy concerns that arise from deploying invasive anti-cheats. 

In recent years, more invasive anti-cheats such as [Vanguard by Riot Games](https://support-valorant.riotgames.com/hc/en-us/articles/360046160933-What-is-Vanguard) have been criticized for allegedly invading the privacy of their users. Recently, more and more anti-cheats are being developed that rely on heuristic detection rather than invasive detection on the client system. This type of anti-cheat software most commonly appears as server-side anti-cheat software, anti-cheats that are built into the game themselves instead of being added on later, and AI-based anti-cheats that use neural networks to detect suspicious behavior.

As the primary way that anti-cheats catch cheaters changes, cheat developers should be informed of some general "best practices" for developing cheats in the future.

### Common Detection Vectors

For the purposes of this research, I am going to be defining "system-level" vectors as any detection vector that is more likely to be out of the control of a cheat developer. This is in contrast to heuristic vectors, which are generally easier to manage and can be thought of as generally common sense. Here are some examples of vectors that could be defined as being "system-level":

- The `LLMHF_INJECTED` flag being shown on injected mouse events
- The `wdfilter.sys` driver, a part of Windows Defender, keeping track of loaded kernel-mode drivers
- Network traffic history and DNS records that show a previous connection to servers known to the anti-cheat provider to host cheating software
- The camera/viewpoint is moving in-game without the mouse moving.

In comparision, here are some examples of detection vectors that could be defined as being "heuristic":

- A mouse event shows a sudden change in velocity or direction that is unrealistic.
- A mouse event shows a change in direction in response to a change in the target's direction, with an unrealistic amount of reaction time.
- Mouse events don't show a correlation to the direction of the in-game camera/viewpoint moving.

As you may have already noticed, the primary source of heuristic detection vectors stems from the way that the cheat interacts with the video game.

Just by scrolling through open-source repositories on the internet, it's easy to see the most common way that cheats have dealt with heuristic vectors for so long.

This is the equation for the most common "smoothing" used in video game cheats, with x₁ being the starting mouse coordinate, x₂ being the target coordinate, and C being the smoothing coefficient:

<latex>
$$
\Delta x=x_1+\frac{x_2-x_1}{C}
$$
</latex>

This equation is a very simple, yet effective form of making sure that the mouse does not instantly snap from its current position to the target. By implementing this smoothing function, the mouse movements look slightly more realistic. However, there are still many issues even after implementing smoothing which could be detected by a highly heuristic anti-cheat:

- Each movement will have a lower distance than the previous movement.
- The movement direction reacts instantly to changes in the target's direction.

Another attempt to make the movement look more human relies on randomization. This could take the form of a randomized value being added to each mouse coordinate, a randomized movement speed, or a randomized amount of smoothing. However, as smoothing is only added onto a pre-calculated smoothing curve, it would still be trivially easy to detect.

### Characteristics of Human Mouse Movement

Understanding how real people interact with video games is crucial in understanding how to mimic the interaction. When researching human mouse movement, I looked into the following components:

### Movement Speed

As the movement speed is one of the more sensitive detection vectors, I first started by writing a program in C++ that would calculate my mouse's movement speed over time, for each movement starting at zero, and write the raw data to a CSV file. This graph shows my mouse movement speed over time:

<img invertable src="/assets/images/FeedForward3.webp"/>    
<p class="image-caption">The speed (Y) of my mouse cursor for various movement curves over time (X).</p>

What is notable about this graph is that the movement speed follows an inverted-U curve, with a bit of randomness added. In video game cheats, movement speed is usually either a linear or exponentially decreasing graph. If an anti-cheat tracks the movement speed of the mouse over time, it would theoretically be very easy to identify cheating players.

### Movement Direction

The mouse cannot realistically move in a constant direction, and it cannot change direction very accurately. 

One example of this can be found in the changes made to controller aim assist in Fortnite throughout 2019 and 2020. While aim assist used to shift your crosshair toward the nearest enemy when aiming down sights (which is very similar to a traditional aimbot-style cheat), aim assist was updated to instead adjust the controller's sensitivity to prefer movements in a specific direction. This way, the player is still in control of the movements, but aim assist makes it easier to move in the correct direction and makes movements away from targets slower.

This implementation of aim assist is actually a great solution to "humanize" the movement direction and speed of the mouse. If a cheat is able to intercept and modify mouse events, they could be adjusted to prefer movements toward the target player.

### Movement Target

Lastly, it's important to pay attention to where the crosshair is actually aiming. For example, if the crosshair is always aiming within a distance of a specific bone (let's say `spine_02` for example) then it is very easy for an anti-cheat to identify suspicious behavior.

Some cheats implement a "smart-bone" system which aims at the part of the player which is already closest to the crosshair. Although this is better, it's still not a perfect solution because line traces from the crosshair still intercept exact bone locations.

The solution to these problems is to have the cheat aim at the nearest bone, and also add a bit of randomness as an offset to that location, so that the crosshair never directly intercepts the bone's position on-screen.

### Reaction Time

[The average human reaction time is around 247ms.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4456887/) This is a problem because if the target location suddenly changes, an aimbot will nearly instantly begin moving the cursor in the target's new direction, while a human will take a minimum of 50-100ms to process the change.

It is, of course, possible to account for this by adding a delay or queueing system to the mouse movements being sent by a cheat, but this is one of many possible detection vectors that often goes overlooked. In the context of HID-based cursor movement, [a post on the Unknown Cheats forum](https://www.unknowncheats.me/forum/3968927-post13.html) discusses even more heuristic vectors that could potentially be detected by anti-cheat software:

> *"I also think it'd be worth more of Vanguard's time to detect everyone, despite how good their mouse setup is, by simply looking for unrealistic aiming, reaction time, and stats, which I don't doubt they've already done extensively."*

In short, with some anti-cheats, you are much more likely to be banned based on an account trust system and suspicious gameplay heuristics. Remember that the best cheaters are already decent at the game.

### Making a Heuristically Undetectable Cheat

In terms of ways that the game is interacted with, a "heuristically undetectable" cheat would abide by the following guidelines:

- Reaction time is correctly simulated using a mouse event queueing system or similar.
- Mouse movement events are correctly modified by preferring movements towards the target.
- Never prefer movement events *directly* toward a target bone position

Once all of these conditions are met, a correctly-developed cheat would be much harder to detect than a cheat which triggers heuristic detections.