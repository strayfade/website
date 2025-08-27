{
"title": "418",
"description": "Webserver running inside a teapot",
"tags": [],
"author": "strayfade",
"date": "7/22/2025",
"showTitle": true,
"indexed": true,
"pinned": false
}

> There's really nothing to talk about here. I put a webserver inside a teapot which fully implements [RFC2324 section 2.3.2](https://www.rfc-editor.org/rfc/rfc2324#section-2.3.2).

<img src="/assets/images/teapot1.webp"/>
<p class="image-caption">ESP32 webserver running on a teapot.</p>

The webserver (if you're lucky) is currently accessible at [teapot.strayfade.com](https://teapot.strayfade.com), although who knows how long it will stay there. Moving from place to place and keeping track of the constantly-changing IP address of an actual teapot might be too much for me.

<img src="/assets/images/teapot2.webp"/>
<p class="image-caption">Top view</p>

> From [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418)
>
> The HTTP `418 I'm a teapot` status response code indicates that the server refuses to brew coffee because it is, permanently, a teapot. A combined coffee/tea pot that is temporarily out of coffee should instead return 503. This error is a reference to Hyper Text Coffee Pot Control Protocol defined in April Fools' jokes in 1998 and 2014.