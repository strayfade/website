> **Before we get started**, it's important to know that Gobuster should only be used against systems you have permission to scan. Gobuster is **NOT** a silent scan, and is easily noticable.

### Introduction
[Gobuster](https://github.com/OJ/gobuster) is an enumeration tool used to find directories and files on the internet. As the name would imply, it's primarily written in the programming language **Go**, and it is a very useful tool for finding hidden information or files on a server.

However, before we can run `gobuster`, there are some things we need to take into account first.

1. The User-Agent used by `gobuster` is set to `gobuster/<version>` by default. This means that any servers we are sending requests to can see that we are using `gobuster` to send those requests. To resolve this, we must change the User-Agent using the `-a` argument `-a "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"`. This way, all of our requests look like they are coming from a normal Google Chrome browser.
2. The number of threads that `gobuster` uses to send requests defaults to 10. This is fine for most systems, but if you are on a slower computer, I would recommend lowering this value using the `-t` argument, such as `-t 4`

### Great, now do it

 - `/wordlists/Discovery/Web-Content/small.txt` is our wordlist to use (this one is from [SecLists](https://github.com/danielmiessler/SecLists))
 - `-t 10` tells `gobuster` to use 10 threads
 - `-b 404,301` tells `gobuster` the blacklisted status codes. `404` should go without saying, but the particular server I was scanning also used `301` (Redirect status code) instead of `404` in some cases, so it was blacklisted too.
  
We start by running the command `gobuster dir -u <url> -w /wordlists/Discovery/Web-Content/small.txt -t 10 -b 404,301 -a "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"`

        ===============================================================
        Gobuster v3.3
        by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
        ===============================================================
        [+] Url:                     <url>
        [+] Method:                  GET
        [+] Threads:                 10
        [+] Wordlist:                /wordlists/Discovery/Web-Content/big.txt
        [+] Negative Status codes:   404,301
        [+] User Agent:              Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36
        [+] Timeout:                 10s
        ===============================================================
        2023/01/18 09:45:25 Starting gobuster in directory enumeration mode
        ===============================================================
        /.htpasswd            (Status: 403) [Size: 1037]
        /.htaccess            (Status: 403) [Size: 1037]
        /cgi-bin/             (Status: 403) [Size: 1037]
        /favicon.ico          (Status: 200) [Size: 15086]
        /ftpstat              (Status: 401) [Size: 1294]
        /plesk-stat           (Status: 401) [Size: 1294]
        /sitemap.xml          (Status: 200) [Size: 10950]
        /usage                (Status: 403) [Size: 1037]
        /webstat              (Status: 401) [Size: 1294]
        /webstat-ssl          (Status: 401) [Size: 1294]
        2023/01/18 09:50:03 Finished
        ===============================================================

I see something special in these results...

        /sitemap.xml          (Status: 200) [Size: 10950]

Navigating to this path in a web browser reveals an entire XML map of the site, including hidden paths that aren't accessible from the main site.

        <urlset>
            ...
            <url>
                <loc>/about-us/</loc>
                <changefreq>monthly</changefreq>
                <priority>0.5</priority>
            </url>
            <url>
                <loc>/about-us/our-staff/</loc>
                <changefreq>monthly</changefreq>
                <priority>0.5</priority>
            </url>
            ...
        </urlset>

