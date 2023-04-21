{
    "title": "Typewriter",
    "description": "Writing a bot to complete my typing homework",
    "tags": ["NodeJS"],
    "author": "Noah",
    "date": "4/19/2023",
    "showTitle": true,
    "indexed": true,
    "pinned": true
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

*Simple enough, right?* However, I quickly encountered a problem: Typing.com seems to have some sort of protection against injected keystrokes. I couldn't use browser-facing JavaScript to execute the keypresses to type the letters; the keypresses had to be sent externally.

### Solution 1
After this, I took what I learned and moved to Python. With no way to easily and directly get the letters to type from an external program (such as Python), I decided that the best solution would be to use OCR (Optical Character Recognition).

Using OCR, I could capture a section of the screen and detect letters from it. To do this, I used the `pytesseract` package for Python and installed the Tesseract CLI. Ultimately, this solution worked, but it had many pitfalls.

 - Python is inherently and notoriously slow.
 - Each section I wanted the bot to type had to be manually selected/screenshotted, which became time-consuming and tedious.
 - This all had to work cross-platform since I use Windows, MacOS, and Ubuntu Linux on a daily basis, which wasn't easy to do in Python.
 - Some characters simply couldn't be recognized by Tesseract, such as Typing.com's newline character (`⏎`) which requires the user to press `enter`.

*So, that's why I decided to try...*
### Solution 2

**Selenium Webdriver** is a framework for NodeJS that allows developers to create tests and automate tasks by creating a contained browser and sending commands to it. *This is perfect for what we are trying to accomplish!*

Selenium solves every single problem that the Python version had, and as a bonus, we can make Selenium auto-progress through all of the typing challenges on its own. 

So, I rewrote basically the same code as before for Selenium Webdriver in NodeJS and let it type one of the lessons out on its own.

<img src="/assets/images/Typing2.png"/>
<p class="Caption">I accidentally did this on my school account...</p>

> The source code for this project is available at [Strayfade/SeleniumTypewriter](https://github.com/Strayfade/SeleniumTypewriter/blob/main/index.js)

> The old version of the source code (Python OCR version) is also available at [Strayfade/Typewriter](https://github.com/Strayfade/Typewriter/blob/main/Typewriter.py)

### References
 - [https://typing.com](https://typing.com)
 - [https://addons.mozilla.org/en-US/firefox/addon/tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey)