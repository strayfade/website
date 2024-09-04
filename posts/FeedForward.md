{
"title": "AI vs. Anti-cheats",
"description": "Using heuristic vectors to make smarter cheats (and anti-cheats)",
"tags": ["Anti-cheat", "AI", "C++"],
"author": "Strayfade",
"date": "8/19/2024",
"showTitle": true,
"indexed": true,
"pinned": true,
"tex": true
}

\documentclass{article}

\usepackage{comment, multicol}
\usepackage{hyperref}

\usepackage{calc,pict2e,picture}
\usepackage{textgreek,textcomp,gensymb,stix}

\setcounter{secnumdepth}{2}
\title{Generating realistic mouse movement patterns to evade heuristic detection by anti-cheat software}
\author{Noah Taylor (@strayfade)}
\date{4 September 2024}

\begin{document}

\maketitle


\begin{abstract}
This document will explain the importance of correctly implemented heuristic detection vectors in anti-cheat software. Furthermore, the document explores ways that these detection vectors could be evaded by video game cheats, primarily by generating human-looking mouse movement curves using neural networks.
\end{abstract}


\section{Introduction}

With video game cheats becoming more and more advanced each day, many anti-cheat solutions are generally failing to keep up. This could be due to technical limitations, such as with elevated priviliges being required to detect almost all low-level cheats. Additionally, the failure to develop better anti-cheat software could be due to the privacy concerns that arise from deploying invasive anti-cheats. 

In recent years, more invasive anti-cheats such as \href{https://support-valorant.riotgames.com/hc/en-us/articles/360046160933-What-is-Vanguard}{Vanguard by Riot Games} have been criticized for allegedly invading the privacy of their users. Recently, more and more anti-cheats are being developed that rely on heuristic detection rather than invasive detection on the client system. This type of anti-cheat software most commonly appears as server-side anti-cheat software, anti-cheats that are built into the game themselves instead of being added on later, and AI-based anti-cheats that use neural networks to detect suspicious behavior.

As the primary way that anti-cheats catch cheaters changes, cheat developers should be informed of some general "best practices" for developing cheats in the future.

\section{Common Vectors}

For the purposes of this research, I am going to be defining "system-level" vectors as any detection vector that is more likely to be out of the control of a cheat developer. This is in contrast to heuristic vectors, which are generally easier to manage and can be thought of as generally common sense. Here are some examples of vectors that could be defined as being "system-level":

\begin{itemize}
    \item{The \texttt{LLMHF\_INJECTED} flag being shown on injected mouse events}
    \item{The \texttt{wdfilter.sys} driver, a part of Windows Defender, keeping track of loaded kernel-mode drivers}
    \item{Network traffic history and DNS records that show a previous connection to servers known to the anti-cheat provider to host cheating software}
    \item{The camera/viewpoint is moving in-game without the mouse moving.}
\end{itemize}

In comparision, here are some examples of detection vectors that could be defined as being "heuristic":

\begin{itemize}
    \item{A mouse event shows a sudden change in velocity or direction that is unrealistic.}
    \item{A mouse event shows a change in direction in response to a change in the target's direction, with an unrealistic amount of reaction time.}
    \item{Mouse events don't show a correlation to the direction of the in-game camera/viewpoint moving.}
\end{itemize}

As you may have already noticed, the primary source of heuristic detection vectors stems from the way that the cheat interacts with the video game.

\section{Invalid Solutions}

Just by scrolling through open-source repositories on websites like Github, it's easy to see the most common way that cheats have dealt with heuristic vectors for so long.

This is the equation for the most common "smoothing" used in video game cheats, with $x_1$ being the starting mouse coordinate, $x_2$ being the target coordinate, and $C$ being the smoothing coefficient:

$$
x_2=x_1+\frac{x_2-x_1}{C}
$$

This equation is a very simple, yet effective form of making sure that the mouse does not instantly snap from its current position to the target. By implementing this smoothing function, the mouse movements look slightly more realistic. However, there are still many issues even after implementing smoothing which could be detected by a highly heuristic anti-cheat:

\begin{itemize}
    \item{\textbf{Each movement will have a lower distance than the previous movement.}}
    \item{The movement direction reacts instantly to changes in the target's direction.}
\end{itemize}

Another attempt to make the movement look more human relies on randomization. This could take the form of a randomized value being added to each mouse coordinate, a randomized movement speed, or a randomized amount of smoothing. However, as smoothing is only added onto a pre-calculated smoothing curve, it would still be trivially easy to detect.

$$
\text{This post is currently WIP. To be continued!}
$$

\end{document}

