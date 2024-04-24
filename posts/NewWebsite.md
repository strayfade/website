{
"title": "New Website",
"description": "Some interesting things about how my website was made",
"tags": ["JavaScript", "NodeJS", "Web"],
"author": "Strayfade",
"date": "8/31/2022",
"showTitle": true,
"indexed": false
}

### UPDATE

> As of 2/14/2023, the "new" website that this article is referring to is not the current version. The version of **strayfade.com** discussed in this article is completely different than the current version. To see the old version, download it from [this](https://github.com/Strayfade/Website/tree/48a463ccbb64c59ec4f5dc9cbb690d05ea4b87b6) GitHub link.
>
> Although, most of the optimization and things I learned in this article do still apply to the new website.

As you may have noticed, I decided to rewrite [strayfade.com](https://strayfade.com) to focus more on the usability and aesthetic aspects of the website.

Here are some high points of the new website

### Zero images

Every graphic shown on the entire site is made and displayed using **SVG**, or Scalable Vector Graphics. Everything from the `favicon` to the sharing button icons are displayed using SVG. All of these icons (except my logo) are sourced from [FontAwesome](https://fontawesome.com/), but the library itself is not being used for performance reasons.

The main reason for making this change was the un-optimized images on the last site. The 50x50px header logo was actually a 1080p image, and the banner shown on each page was 2560x1440, if I remember correctly. Having images is not always bad if they are optimized and loaded correctly, but I still prefer using SVG for the faster loading times.

### Maximum server-side, minimum client-side

The last website loaded the `body` first, then used scripts to request the header and footer from different files. Although this allowed me to change the header on all of the website's pages at once, it was nowhere near fast, since extra requests had to be made to load the header and footer.

**How do I solve this?** The server assembles the entire page using modules and sends it to the client as a single file. This approach is similar to a framework like React, where sections of the site can be defined individually. This way, the entire site is already put together, and the client doesn't have to assemble it bit by bit.

This also means that there are no static HTML files on the server!

> [Here](https://www.webpagetest.org/result/221101_AiDcYJ_24J/) is the perfect Lighthouse test score for the site.
>
> It's likely outdated now, but the site still performs relatively well.

### No inline styles

There are no elements on the entire site which **normally** have a `style` attribute. Although I still use the attribute for some scripts which modify elements, most elements on the site use CSS classes instead.

### Upgraded analytics

Before, I was just using a JSON file to log all of the requests to the website, but now the website can be interfaced with MongoDB to provide more analytics information. Also, all analytics functions happen server-sided, and the client doesn't make any requests to a collection endpoint. This way, the server handles all analytics, and the client keeps running smoothly.

### Minimize request chaining (build system)

The build system runs every time the server restarts, and combines all of the site's CSS files and client-side scripts into single files. Additional operations can be performed on these files too, like optimizing them, `minify`ing them, and obfuscating JavaScript code if need be.

The only files requested by the page are [Production.css](/build/production.css) and [Production.js](/build/production.js), and the browser will also request either [Icon.svg](/assets/Icon.svg) or its fallback ([Icon.png](/assets/Icon.png)).

### Open-source

The code for this website is completely open-source and available on [Strayfade/Website](https://github.com/Strayfade/Website) (Github)
