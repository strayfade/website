{
    "title": "Breaking WPA2 (again)",
    "description": "Learning how to automate Wi-Fi pentesting",
    "tags": ["Hacking", "Linux", "WPA"],
    "author": "Noah",
    "date": "7/20/2023",
    "showTitle": true,
    "indexed": true,
    "disableHighlighting": true,
    "pinned": true
}

> **Disclaimer**
> 
> This post is a work-in-progress! This means that content could be added or removed from this post at any time, and it also means that I am likely not finished writing this article.

### What I've been up to...

Last year, I managed to gain administrative access to my high school's local network using the **aircrack-ng** suite of command-line tools. Furthermore, I was able to access security camera footage (and recordings) using a **public vulnerability** in their DVR's firmware ([see **CVE-2018-9995**](https://nvd.nist.gov/vuln/detail/CVE-2018-9995)). I was also able to access and control some of the network-connected devices (such as HP printers).

This year, however, I want to step up my game and do things a bit more seriously. Firstly, I want to automate as much of this process as possible using **bash scripts** and **Python**, if necessary. I would also like to learn a lot more about the tools I'm using, specifically **Hashcat**, the utility I used to brute-force the WPA2 handshake capture last year.