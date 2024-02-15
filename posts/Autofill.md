{
"title": "Autofill",
"description": "Cheating in online classes using an insecure API",
"tags": ["Browser", "Javascript", "APIs"],
"author": "Noah",
"date": "11/14/2023",
"showTitle": true,
"indexed": true,
"disableHighlighting": false,
"pinned": true
}

> **Disclaimer**
>
> I do not condone cheating in online classes.

### What have I been doing?

_Well, mostly working on music._ But when I'm not doing that, I'm usually doing work for school. Here is an example of the "**Foundations in Personal Finance**" class, taken through the **RamseyClassroom** website:

<img src="/assets/images/Autofill1.png"/>
<p class="Caption">In this portion of the assignment, we have to watch a video and fill in the blanks using what is explained in the video.</p>

Originally, my first idea was to grab the transcript (closed captions) for the video and then search for the content before and after the blanks. This would have worked because the sentences used in the fill-in-the-blank questions are pulled directly from the video's dialogue. However, there was a better solution.

### API

By checking DevTools, I noticed JSON responses coming from an API that had basically all of the class content. **And, for whatever reason, this included all of the answers to the questions.**

<img src="/assets/images/Autofill2.png"/>
<p class="Caption">Why?</p>

As soon as I saw this, I knew that all I had to do was replay that request, capture the answers from the JSON response, and autofill them in the `input` textboxes using some everyday browser Javascript.

The original version of this code looked like this:

    // This is a bad way of getting the userToken cookie. Don't do this.
    fetch("https://www.foundationsdigital.com/api/v3/course_content_items/" + window.location.toString().split("/")[window.location.toString().split("/").length - 1], {
        "headers": {
            "authorization": "Bearer " + document.cookie.toString().split("userToken=")[1].split(";")[0]
        }
    })
    .then(await async function (Response) {
        // Parse answers and fill textboxes
        let ResponseJSON = await Response.json();
        const Questions = ResponseJSON.course_content_item.lms_content.shortcodes[1].questions;
        // Sync the answers with the correct questions
        Questions.sort((a, b) => a.sort - b.sort)
        let OutTextboxes = document.querySelectorAll('.gzl-Input input')
        for (let x = 0; x < Questions.length; x++) {
            OutTextboxes[x].value = Questions[x].answers[0].text
        }
    });

Later on, I added a button to the website that would run this code and autofill the answers. The script is available as a [TamperMonkey Userscript](https://gist.github.com/Strayfade/2975e2f5fa2566b53f5bb2dbae3b5be9/raw/b0ef862645d3ffd42c9feda25bcf5d397d33c3e6/RamseyClassroom.user.js), and the raw code is also available [here](https://gist.github.com/Strayfade/2975e2f5fa2566b53f5bb2dbae3b5be9).

> **Moral of the story**
>
> If you ever design a classwork API, please just use forms and check the answers using server-side code.
