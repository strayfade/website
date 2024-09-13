{
"title": "Like An Onion",
"description": "Rewriting my cheat to operate without an internet connection (for now)",
"tags": ["Anti-cheat", "Security", "C++"],
"author": "Strayfade",
"date": "9/10/2024",
"showTitle": true,
"indexed": false,
"pinned": true,
"tex": false
}

### Introduction
When I started this project, I had been writing and using my own license key authentication system in video game cheats. It was fairly simple: a usermode application asks the customer for a license key (which had presumably been sent to them upon purchase of the software), then the application sends that license key off to a server for the server to verify its validity. This works great, but there are a few key issues with this system:

- Authentication requires internet access and relies on vulnerable web requests.
- Authentication requires a key to be entered by the user, which is commonly lost or forgotten.
- Authentication is insecure, and can be bypassed by simply skipping the authentication step in a disassembler.

I recognized these signs early on, and created some simple solutions with my authentication software **XAuth**:

- Authentication still requires internet access, but uses AES-encrypted websocket packets which are less vulnerable and harder to read.
- The user's key is connected to an account, such as a Discord account, which makes it difficult to lose or forget. Additionally, customers are encouraged to copy and paste their key using the clipboard rather than entering it in manually.
- Multiple checks (such as constantly validating the key in another thread) ensure that the authentication step can't be easily bypassed.

### Expanding on this
These quick fixes began the year-long process of rewriting my entire cheat to use a convoluted websocket communication pipeline which, to be honest, I didn't quite understand myself. As anti-cheats commonly identify other cheat users by hashing the executable file, I had developed a set of server-side functions which would recompile each component of the cheat with its own unique identifiers. This would change the executable's hash just enough that an anti-cheat wouldn't flag them. Business was booming.

### Everything falls apart
When I moved out of my parents' house, I had planned on temporarily leaving my main server running at their house while I moved into my new place. 

> AWS instances are way too expensive right now. This website used to be hosted on an EC2, but now I self-host everything.

After I moved in and got situated, I finally sat down to continue working on my cheat. I launch the executable used to map the driver into memory and...

my computer black-screens.

*Not a good sign!* After a bit of debugging, I find out that all of the functions used to send web requests are returning errors, similarly to what happens when a user doesn't have internet. Confused, I opened Firefox and navigated to [strayfade.com](https://strayfade.com):

**Page Blocked.**

> [strayfade.com](https://strayfade.com) is blocked on my school's internet.

### Rewriting the cheat to not require an internet connection

Let's back up for a second. I started by creating a new solution in Visual Studio, 