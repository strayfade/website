{
    "title": "Typewriter",
    "description": "Writing a bot to complete my typing homework",
    "tags": ["NodeJS"],
    "author": "Noah",
    "date": "4/19/2023",
    "showTitle": true,
    "indexed": true,
    "pinned": false
}
### The Basics
 - [Typing.com](https://typing.com) is a website that offers challenge sets to practice your typing.
 - Typing.com has an optional teacher/student system, where a "teacher" can view the progress that student accounts have made.
 - **Fun Fact 1**: I know how to type already.
 - **Fun Fact 2**: I don't want to type more than I already do daily.

<img src="/assets/images/Typing1.png"/>
<p class="Caption">I'm not typing this.</p>

### How do we approach this challenge?
Initially, I thought that the best way to approach this would be to write a browser script that could be executed by a Firefox extension such as [TamperMonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/). By using DevTools on the site, I could see that all of the characters to type had the class name `letter`. I started out with the following code:

    let characters = document.getElementsByClassName("letter");

*Simple enough, right?* However, I quickly encountered a problem: Typing.com seems to have some sort of protection against injected keystrokes. I couldn't use browser Javascript to execute the keypresses to type the letters; the keypresses had to be sent externally.

### Solution 1
After this, I took what I learned and moved to Python. With no way to easily and directly get the letters to type from an external program (such as Python), I decided that the best solution would be to use OCR (Optical Character Recognition).

Using OCR, I could capture a section of the screen and detect letters from it. To do this, I used the `pytesseract` package for Python and installed the Tesseract CLI. Ultimately, this solution worked, but it had many pitfalls.

 - Python is inherently and notoriously slow.
 - Each section I wanted the bot to type had to be manually selected/screenshotted, which became time-consuming and tedious.
 - This all had to work cross-platform since I use Windows, MacOS, and Linux, which wasn't easy to do in Python.
 - Some characters simply couldn't be recognized by Tesseract, such as Typing.com's newline character (`⏎`) which requires the user to press `enter` to continue.

*So, that's why I decided to try...*
### Solution 2

**Selenium Webdriver** is a package for NodeJS that allows developers to create web tests by creating a contained, automated browser and sending commands to it. *This is perfect for what I am trying to accomplish!*

Selenium solves every single problem that the Python version had, and as a bonus, I can make Selenium auto-progress through all of the typing challenges on its own by detecting the "next lesson" button. 

So, with this knowledge, I rewrote the task at hand using Selenium. Keys would be detected via browser Javascript, as before, but now I could send the keypresses from Selenium. The only downside to this method is that (since Selenium Webdriver creates a sandboxed browser) I would have to re-login to my Typing.com account every time I wished to test the code, but this only ended up as a minor issue.

I wrote further code to simulate typing mistakes, which would then press backspace and re-type the correct letter, and I also added logic to type at different speeds (in "words per minute"). Without these limiters, it's incredible what times the script can achieve.

<img src="/assets/images/Typing2.png"/>
<p class="Caption">I accidentally did this on my school account...</p>

> The source code for this project is available at the repository [Strayfade/Typewriter](https://github.com/Strayfade/Typewriter/blob/main/index.js)

### References
 - [https://typing.com](https://typing.com)
 - [https://addons.mozilla.org/en-US/firefox/addon/tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey)