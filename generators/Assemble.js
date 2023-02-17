const { Localize } = require("./tools/LocaleTools");
const RequestInfo = require("../middleware/RequestBlocking");
const { Log } = require("../Log");
const Head = require("./Head");

const fs = require('fs/promises');
const fsdir = require('fs');
const Markdown = require("markdown").markdown;
const Prism = require("prismjs");

const loadLanguages = require("prismjs/components/");
loadLanguages(["cpp"]);

const AvailablePages = {
  Home: Symbol("Home"),
  Dynamic: Symbol("Article"),
  R: Symbol("R"),
  NonstandardPages: ["R"],
};
function CalculateAge() {
  var AgeDif = new Date(Date.now() - new Date(1131950100000));
  return Math.abs(AgeDif.getUTCFullYear() - 1970);
}
let Cache = [];
const GeneratePageCached = async function (
  req,
  Article,
  Locale,
  AvailablePages,
  AvailablePageSelector,
  Custom = "",
  Filename
) {
  let ServeInfo =
    " (" +
    RequestInfo.RequestAnalytics.TotalRequestsServed +
    " served, " +
    RequestInfo.RequestAnalytics.TotalRequestsBlocked +
    " blocked)";
  let CacheObject = {
    A: Article,
    B: Locale,
    C: AvailablePageSelector,
    D: Custom,
    E: Filename,
  };
  let Found = {};
  for (var x = 0; x < Cache.length; x++) {
    if (Cache[x].A == CacheObject.A) {
      if (Cache[x].B == CacheObject.B) {
        if (Cache[x].C == CacheObject.C) {
          if (Cache[x].D == CacheObject.D) {
            if (Cache[x].E == CacheObject.E) {
              Found = Cache[x];
            }
          }
        }
      }
    }
  }
  if (Found.A == Article) {
    Log("Found page in cache: " + req.url + ServeInfo);
    return Found.F;
  } else {
    CacheObject.F = GeneratePage(
      Article,
      Locale,
      AvailablePages,
      AvailablePageSelector,
      Custom,
      Filename
    );
    Cache.push(CacheObject);
    Log("Rendered page for cache: " + req.url + ServeInfo);
    return CacheObject.F;
  }
};

function CreateTooltips() {
  let Output = "";
  Output += "<div class='TooltipContainer MobileHidden'>";
  Output +=
    "<p id='TooltipText' class='TooltipText NoSelect' aria-hidden='true'>";
  Output += "</p>";
  Output += "</div>";
  Output += "<div class='TooltipContainer MobileHidden'>";
  Output +=
    "<p id='TooltipText2' class='TooltipText TooltipTextSmall NoSelect' aria-hidden='true'>";
  Output += "</p>";
  Output += "</div>";
  return Output;
}
const GenerateHeader = function (
  Article2,
  Locale,
  AvailablePages,
  AvailablePageSelector,
  Custom,
  Filename
) {
  return `
        <div class="Header">
            <svg class="Icon Coloring1" onclick="GoHome()" version="1.0" xmlns="http://www.w3.org/2000/svg" width="300.000000pt" height="300.000000pt" viewBox="0 0 300.000000 300.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)"><path d="M2707 5344 c-178 -217 -563 -686 -857 -1043 -609 -741 -676 -830 -786 -1052 -265 -529 -186 -1034 228 -1460 114 -117 678 -590 702 -588 9 1 372 434 806 964 1176 1433 1361 1655 1376 1655 73 0 193 -307 179 -459 -16 -176 -34 -201 -1014 -1389 -506 -615 -920 -1123 -920 -1130 2 -19 587 -490 606 -487 9 1 194 217 410 480 216 263 596 725 844 1027 679 823 798 1012 870 1376 103 514 -94 878 -779 1439 l-277 227 -46 -47 c-42 -43 -814 -980 -1749 -2122 -203 -249 -380 -453 -393 -454 -40 -2 -147 163 -180 276 -75 257 -63 276 863 1400 429 521 842 1022 917 1114 75 92 131 176 124 187 -17 28 -549 463 -577 472 -13 4 -169 -169 -347 -386z"></path></g></svg>
        </div>
        <div class="Sidebar SidebarRight" id="SidebarMain">
            <a href="https://github.com/Strayfade" data-tooltip="GitHub"><svg class="Icon Coloring1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg></a>
            <a href="https://github.com/Strayfade/Website" data-tooltip="Source Code"><svg class="Icon Coloring1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"></path></svg></a>
            <a href="https://twitter.com/Strayfade" data-tooltip="Twitter"><svg class="Icon Coloring1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a>
            <a href="https://youtube.com/Strayfade" data-tooltip="YouTube"><svg class="Icon Coloring1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg></a>
        </div>
        <div class="SidebarScrollPercentage">
            <div class="SidebarScrollFill"></div>
        </div>
    `;
};
const GenerateFooter = function (
  Article,
  Locale,
  AvailablePages,
  AvailablePageSelector,
  Custom,
  Filename
) {
  return `
        <div class="Footer2 Coloring1" style="opacity: 1">
            <h3>Scroll Down</h3>
        </div>
        <div class="Footer">
            <h3>© Copyright 2023 Strayfade. All Rights Reserved.</h3>
        </div>
    `;
};
const GenerateShareSection = function (Locale, Filename) {
    let Output = `
    <div class="ShareSection">
    <p class="ShareHeader">` + Localize(Locale, "share_section_header") + `</p>
    <div class="ShareButtonContainer">
    <a aria-label="Copy Link" class="ShareItemLink" onclick="navigator.clipboard.writeText(document.URL);">
    <div class="ShareItem ShareButtonGray">
    <svg class="ShareItemInner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path></svg>
    </div>
    </a>
    <a aria-label="Share to Facebook" class="ShareItemLink" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&quote=' + encodeURIComponent(document.URL))">
    <div class="ShareItem ShareButtonFacebook">
    <svg class="ShareItemInner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
    </div>
    </a>
    <a aria-label="Share to Twitter" class="ShareItemLink" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20' + encodeURIComponent(document.URL))">
    <div class="ShareItem ShareButtonTwitter">
    <svg class="ShareItemInner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
    </div>
    </a>
    <a aria-label="Share to Reddit" class="ShareItemLink" onclick="window.open('https://www.reddit.com/submit?url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title))">
    <div class="ShareItem ShareButtonReddit">
    <svg class="ShareItemInner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"></path></svg>
    </div>
    </a>
    </div>
    </div>
    <div class="ShareButtonContainer ShareMaxWidth">
    <a class="LinkNormal Spaced" href="https://github.com/Strayfade/Website/blob/main/posts/` + Filename + `" style="margin-left: auto;">View on GitHub</a>
    <a class="LinkNormal Spaced SpacedMobile" href="https://raw.githubusercontent.com/Strayfade/Website/main/posts/` + Filename + `">View Raw</a>
    </div>
    `

    return Output;
}
const GenerateBodyV2 = async function (
  Article2,
  Locale,
  AvailablePages,
  AvailablePageSelector,
  Custom,
  Filename
) {
  let Output = "";
  switch (AvailablePageSelector) {
    case AvailablePages.Home:
      Output +=
        `
                <div class="Slide SlideVisible" id="Slide1" style="background-color: white"></div>
                <div class="Slide SlideContentVisible" id="SlideContent1">
                    <div class="GradientContainer">
                        <div class="Gr Gr-1"></div>
                        <div class="Gr Gr-2"></div>
                        <div class="Gr Gr-3"></div>
                        <div class="Gr-Plus Gr-4"></div>
                        <div class="Gr-Plus Gr-5"></div>
                        <div class="Gr-Plus Gr-6"></div>
                    </div>
                    <div class="SlideInner" style="color: black">
                        <p class="Author">Strayfade</p>
                        <h1 class="Slide1 Slide1Visible">Portfolio</h1>
                        <p class="Slide1 Slide1Visible">Hello! I am Noah, a <rd data-tooltipsmall="Automatically Updates">` + CalculateAge() + `-year-old</rd> software developer (primarily <rd>web development</rd>) and <rd>music artist</rd> from the <rd>United States</rd></p>
                        <br class="Slide1 Slide1Visible">
                        <h3 class="Slide1 Slide1Visible">Posts</h3>
                        <br class="Slide1 Slide1Visible">
                        `

                        // Index
                        let Posts = []
                        let indexed = [];

                        let filenames = fsdir.readdirSync(__dirname.replace("generators", "posts/"));
                        for (var x = 0; x < filenames.length; x++) {
                            if (filenames[x].endsWith(".md")) {
                                let JSONstr = await fs.readFile(__dirname.replace("generators", "posts/") + filenames[x], {encoding: "utf-8"})
                                let Current = JSON.parse(JSONstr.split("}")[0] + "}")
                                if (Current.indexed) {
                                    Posts.push({ data: Current, file: filenames[x] })
                                }
                            }
                        }
                        Posts.sort(function(a, b) {
                            const FirstDate = new Date(a.data.date) 
                            const SecondDate = new Date(b.data.date) 

                            return SecondDate - FirstDate
                        })
                        
                        let PostsOnLine = 0;
                        Output += `<div class="Flexbox Slide1 Slide1Visible">`
                        Posts.forEach(Post => {
                            if (Post.file.endsWith(".md") && Post.data.pinned) {
                                let JSON = Post.data
                                if (JSON.indexed) {
                                    PostsOnLine++;
                                    Output += `
                                        <div class="GridItem Slide1 Slide1Visible">
                                        <a href="/` + Post.file.replace(".md", "") + `">
                                            <span style="font-size: 14px; margin-top: 0px; color: black;">` + JSON.date + `</span><span style="font-size: 14px; margin-left: 5px;">(Pinned)</span>
                                            <h3 style="margin-top: 5px; color: white; background-color: var(--accent-color); padding: 5px; padding-right: 7px; width: max-content;">` + JSON.title + `</h3>
                                            <p style="margin-top: 0px; color: black;">` + JSON.description + `</p>`
                                            if (JSON.tags) {
                                                Output += `<div class="ArticleTagContainer" style="margin-top: 4px;">`
                                                for (var y = 0; y < JSON.tags.length; y++) {
                                                    Output += `<span class="ArticleTag">` + JSON.tags[y] + `</span>`
                                                }
                                                Output += `</div>`
                                            }
                                        Output += `</a></div>
                                    `
                                    if (PostsOnLine > 1) {
                                        PostsOnLine = 0;
                                        Output += `</div><div class="Flexbox Slide1 Slide1Visible">`
                                    }
                                    
                                }
                                indexed.push(Post.file)
                            }
                        })
                        Posts.forEach(Post => {
                            if (Post.file.endsWith(".md") && !indexed.includes(Post.file)) {
                                let JSON = Post.data
                                if (JSON.indexed) {
                                    PostsOnLine++;
                                    Output += `
                                        <div class="GridItem Slide1 Slide1Visible">
                                        <a href="/` + Post.file.replace(".md", "") + `">
                                            <p style="font-size: 14px; margin-top: 0px; color: black;">` + JSON.date + `</p>
                                            <h3 style="margin-top: 0px; color: black;">` + JSON.title + `</h3>
                                            <p style="margin-top: 0px; color: black;">` + JSON.description + `</p>`
                                            if (JSON.tags) {
                                                Output += `<div class="ArticleTagContainer" style="margin-top: 4px;">`
                                                for (var y = 0; y < JSON.tags.length; y++) {
                                                    Output += `<span class="ArticleTag">` + JSON.tags[y] + `</span>`
                                                }
                                                Output += `</div>`
                                            }
                                        Output += `</a></div>
                                    `
                                    if (PostsOnLine > 1) {
                                        PostsOnLine = 0;
                                        Output += `</div><div class="Flexbox Slide1 Slide1Visible">`
                                    }
                                    
                                }
                                indexed.push(Post.file)
                            }
                        })
                        Output += "</div>"

        Output += `</div>
                </div>
                <div class="Slide SlideNotViewed" id="Slide2" style="background-color: var(--accent-color)"></div>
                <div class="Slide SlideContentHidden" id="SlideContent2">
                    <div class="GradientContainer">
                        <div class="Gr-Plus Gr-7"></div>
                        <div class="Gr-Plus Gr-8"></div>
                    </div>
                    <div class="SlideInner" style="color: white">
                        <p class="Author"><span id="Counter">0+</span> years <span>coding</span></p></span>
                        <h1 class="Slide2">Projects</h1>
                        <br class="Slide2">
                        <br class="Slide2">
                        <div class="Flexbox Slide2">
                            <div class="GridItem Slide2">
                                <h3>Web Development</h3>
                                <p>Full-stack web development building modern, dynamic interfaces and structured, secure backend solutions.</p>
                                <div class="Icobox">
                                    <a class="Link" href="https://github.com/Strayfade/Website">Source Code
                                        <svg class="Link" style="margin-bottom: -4px; margin-left: -1px;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 5 50 40"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="GridItem Slide2">
                                <h3>Game Hacking</h3>
                                <p>Reading/writing memory and creating user interfaces in C++ for cheats/exploits for video games such as Fortnite.</p>
                                <div class="Icobox">
                                    <a class="Link" href="https://discord.gg/pasters">Discord Server
                                        <svg class="Link" style="margin-bottom: -4px; margin-left: -1px;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 5 50 40"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="Flexbox">
                            <div class="GridItem Slide2">
                                <h3>Neural Networks/AI</h3>
                                <p>Created feed-forward neural network systems for task automation and experimentation.</p>
                                <div class="Icobox">
                                    <a class="Link" href="/FeedForward">Article
                                        <svg class="Link" style="margin-bottom: -4px; margin-left: -1px;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 5 50 40"><path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z"/></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="GridItem Slide2">
                                <h3>Authentication Backends</h3>
                                <p>Created multiple program authentication solutions for distributing paid software with license keys.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Slide SlideNotViewed" id="Slide3" style="background-color: black"></div>
                <div class="Slide SlideContentHidden" id="SlideContent3">
                    <div class="GradientContainer">
                        <div class="Gr Gr-1"></div>
                        <div class="Gr Gr-2"></div>
                        <div class="Gr Gr-3"></div>
                        <div class="Gr-Plus Gr-9"></div>
                        <div class="Gr-Plus Gr-10"></div>
                    </div>
                    <div class="SlideInner" style="color: white">
                        <p class="Author">Connect</p>
                        <h1 class="Slide3">Contact Me</h1>
                        <p class="Slide3">You can send me an email at <a href="mailto:me@strayfade.com">me@strayfade.com</a> and I might read it, or you can shoot me a message on <a href="https://twitter.com/Strayfade">Twitter</a> or <a href="https://instagram.com/strayfade">Instagram</a>.</p>
                        <p class="Slide3" style="margin-top: 10px">My current Discord tag is <a href="https://discord.com/users/455790298082181120">Strayfade#8472</a>, although I do not usually respond to direct messages on Discord.</p>
                    </div>
                </div>
                <div class="MobileButton MobileButtonNext Coloring1" onclick="GoDown()" style="opacity: 1">
                    <p>Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 40 8 24l2.1-2.1 12.4 12.4V8h3v26.3l12.4-12.4L40 24Z"/></svg>
                </div>
                <div class="MobileButton MobileButtonPrev Coloring2" onclick="GoUp()" style="opacity: 0">
                    <p>Previous</p>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.5 40V13.7L10.1 26.1 8 24 24 8l16 16-2.1 2.1-12.4-12.4V40Z"/></svg>
                </div>
            `;
      break;
    case AvailablePages.Dynamic:
        Article = JSON.parse(Article2.split("}")[0] + "}");
        var MarkdownString = Article2.replace(Article2.split("}")[0] + "}", "");

        // Markdown
        if (Custom != "") {
            MarkdownString += "\n\n" + Custom;
        }

        // Highlights codeblocks one at a time
        var NewMarkdown = "";
        var Lines = MarkdownString.split("\n");
        var CurrentCode = "";
        for (let i = 0; i < Lines.length; i++) {
            if (Lines[i].startsWith("    ") || Lines[i].includes("    ")) {
                CurrentCode += Lines[i] + "\n";
            } else {
                if (CurrentCode != "") {
                    NewMarkdown += Prism.highlight(CurrentCode, Prism.languages.cpp, "cpp");
                    CurrentCode = "";
                } else {
                    NewMarkdown += Lines[i] + "\n";
                }
            }
        }
        var MarkdownHtml = "";
        if (Article.disableHighlighting) {
            MarkdownHtml = Markdown.toHTML(MarkdownString);
        } else {
            MarkdownHtml = Markdown.toHTML(NewMarkdown);
        }
        // Markdown.toHTML escapes these characters, but we need them!
        var Length = MarkdownHtml.split("lt;").length + MarkdownHtml.split("gt;").length;
        for (let i = 0; i < Length; i++) {
            MarkdownHtml = MarkdownHtml.replace("&amp;lt;", "<")
            MarkdownHtml = MarkdownHtml.replace("&amp;gt;", ">")
            MarkdownHtml = MarkdownHtml.replace("&amp;quot;", "\"")
            MarkdownHtml = MarkdownHtml.replace("&lt;", "<")
            MarkdownHtml = MarkdownHtml.replace("&gt;", ">")
            MarkdownHtml = MarkdownHtml.replace("&quot", "\"")
            MarkdownHtml = MarkdownHtml.replace("&amp;", "&")
            MarkdownHtml = MarkdownHtml.replace("\";", "\"")
        }
        Output += `
            <div class="Slide SlideVisible" id="Slide1" style="background-color: white"></div>
            <div class="Slide SlideContentVisible" id="SlideContent1">
                <div class="GradientContainer">
                    <div class="Gr Gr-1"></div>
                    <div class="Gr Gr-2"></div>
                    <div class="Gr Gr-3"></div>
                </div>
                <div class="SlideInner" style="color: black; margin-top: 0px; width: 100vw;">
                    <div class="Scrollable">
                        <br>
                        <br>
                        <br>` + (true ? `
                        <div class="Icobox">
                            <a class="Link" href="/" style="color: var(--accent-color);">
                                <svg class="Link" style="margin-bottom: -4px; margin-left: -1px; fill: var(--accent-color);" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 5 50 40"><path xmlns="http://www.w3.org/2000/svg" d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"/></svg>
                                Back
                            </a>
                        </div>` : ``) + (Article.showTitle ? (`
                        <h1 class="ArticleTitle">` + Article.title + `</h1>
                        <h4 style="margin-top: 0px">` + Article.description + `</h4>
                        <p style="margin-top: 10px; padding-bottom: 30px; border-bottom: 3px solid black;">Written by <strong>` + Article.author + `</strong></p>`) : ``) + `
                        <br>
                        ` + MarkdownHtml + ((Custom == "" && Filename != null) ? (Article.showTitle ? GenerateShareSection(Locale, Filename) : ``) : ``) + `
                        <br>
                        <br>
                    </div>
                </div>
            </div>
        `;
      break;
    case AvailablePages.R:
            Output += `<div class="RemContainerContainer">`
            Output += await fs.readFile(__dirname.replace("generators", "assets") + "/Rem", {encoding: "utf-8"})
            Output += `</div>`
            break;
    case AvailablePages.UX:
        Article = JSON.parse(Article2.split("}")[0] + "}");
        var MarkdownString = Article2.replace(Article2.split("}")[0] + "}", "");

        // Markdown
        if (Custom != "") {
            MarkdownString += "\n\n" + Custom;
        }

        // Highlights codeblocks one at a time
        var NewMarkdown = "";
        var Lines = MarkdownString.split("\n");
        var CurrentCode = "";
        for (let i = 0; i < Lines.length; i++) {
            if (Lines[i].startsWith("    ") || Lines[i].includes("    ")) {
                CurrentCode += Lines[i] + "\n";
            } else {
                if (CurrentCode != "") {
                    NewMarkdown += Prism.highlight(CurrentCode, Prism.languages.cpp, "cpp");
                    CurrentCode = "";
                } else {
                    NewMarkdown += Lines[i] + "\n";
                }
            }
        }
        var MarkdownHtml = "";
        if (Article.disableHighlighting) {
            MarkdownHtml = Markdown.toHTML(MarkdownString);
        } else {
            MarkdownHtml = Markdown.toHTML(NewMarkdown);
        }
        // Markdown.toHTML escapes these characters, but we need them!
        var Length = MarkdownHtml.split("lt;").length + MarkdownHtml.split("gt;").length;
        for (let i = 0; i < Length; i++) {
            MarkdownHtml = MarkdownHtml.replace("&amp;lt;", "<")
            MarkdownHtml = MarkdownHtml.replace("&amp;gt;", ">")
            MarkdownHtml = MarkdownHtml.replace("&amp;quot;", "\"")
            MarkdownHtml = MarkdownHtml.replace("&lt;", "<")
            MarkdownHtml = MarkdownHtml.replace("&gt;", ">")
            MarkdownHtml = MarkdownHtml.replace("&quot", "\"")
            MarkdownHtml = MarkdownHtml.replace("&amp;", "&")
            MarkdownHtml = MarkdownHtml.replace("\";", "\"")
        }
        Output += `
            <div class="Slide SlideVisible" id="Slide1" style="background-color: white"></div>
            <div class="Slide SlideContentVisible" id="SlideContent1">
                <div class="GradientContainer">
                    <div class="Gr Gr-1"></div>
                    <div class="Gr Gr-2"></div>
                    <div class="Gr Gr-3"></div>
                </div>
                <div class="SlideInner" style="color: black; margin-top: 0px; width: 100vw;">
                    <div class="Scrollable">
                        <br id="PageTop">
                        <br>
                        <br>` + (true ? `
                        <div class="Icobox">
                            <a class="Link" href="/" style="color: var(--accent-color);">
                                <svg class="Link" style="margin-bottom: -4px; margin-left: -1px; fill: var(--accent-color);" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 5 50 40"><path xmlns="http://www.w3.org/2000/svg" d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"/></svg>
                                Back to Homepage
                            </a>
                        </div>` : ``) + (Article.showTitle ? (`
                        <h1 class="ArticleTitle">` + Article.title + `</h1>
                        <h4 style="margin-top: 0px">` + Article.description + `</h4>
                        <p style="margin-top: 10px; padding-bottom: 30px; border-bottom: 3px solid black;">Written by <strong>` + Article.author + `</strong></p>`) : ``) + `
                        <br>
                        ` + MarkdownHtml + ((Custom == "" && Filename != null) ? (Article.showTitle ? GenerateShareSection(Locale, Filename) : ``) : ``) + `
                        <br>
                        <br>
                    </div>
                </div>
            </div>
        `;
        break;
  }
  return Output + GenerateHeader() + GenerateFooter();
};
const GeneratePage = async function (
  Article,
  Locale,
  AvailablePages,
  AvailablePageSelector,
  Custom = "",
  Filename = "_None.md"
) {
  let HeadStr = await Head.GenerateHead(Article, Locale);
  let BodyStr = await GenerateBodyV2(
    Article,
    Locale,
    AvailablePages,
    AvailablePageSelector,
    Custom,
    Filename
  );

  Output =
    `
        <!DOCTYPE html>
        <html lang="` +
    Localize(Locale, "locale_title") +
    `">
        <head>` +
    HeadStr +
    `</head>
        <body` + ((AvailablePageSelector == AvailablePages.R) ? ` style="filter:invert(1); background-color: black;"` : ``) + `>
        <main>
        ` +
    BodyStr +
    `
        </main>
    ` +
    CreateTooltips() +
    `
        <script src="/Production.js"></script>
        </body>
        </html>
    `;
  return Output;
};

module.exports = { GeneratePageCached, GeneratePage, AvailablePages };
