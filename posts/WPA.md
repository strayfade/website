### Disclaimer

> Do not try anything you see done here! *Do as I say, not as I do.*
> 
> WPA2-PSK cracking is unethical, and in some cases even illegal. Make sure you have permission to mess with networks.

### *Why do you want access to the school's internet, anyways?*

1. This network has every nearly every administrative device connected to it. Do I want to mess with all of that? No. Is it fun to look around and count how many printers a school really needs? Yes.
2. For a kid studying cybersecurity, this is basically an end-goal. I'll be graduating in a year or two so I have to have as much fun as possible!
3. If I get lucky, the security camera system will be connected to the same network instead of being closed-circuit. Watching what people are doing over a camera system is almost as fun as watching Netflix during 4th period.

### So, how do we do all that?

Let me introduce you to the [aircrack-ng](https://www.aircrack-ng.org/) suite.

Aircrack is a collection of command-line tools (airmon, airodump, aireplay, and aircrack primarily) that is used to bruteforce WPA/WPA2 encryption.

First, I use the command `airmon-ng check kill` to kill any processes that may be using the network card. The service `avahi-daemon` is also using the network card and auto-restarts when killed, so I use `systemctl stop avahi-daemon` to prevent it from autostarting. Since I'm not disabling the service entirely, it will return when I restart my laptop, so no worries there. Of course, we're running these commands as root.


    root@kubuntu:~# systemctl stop avahi-daemon

    root@kubuntu:~# airmon-ng check kill

    Killing these processes:

    PID Name
    940 wpa_supplicant


With that being done, I can switch the network card (identified as `wlp1s0`) into **monitor mode**. This allows it to pick up (or "sniff") packets being sent to/from an access point. I can also specify a channel with the `-c` flag, but this isn't that necessary for what I'm doing.


    root@kubuntu:~# airmon-ng start wlp1s0

    PHY	Interface	Driver		Chipset
    phy0	wlp1s0		rtw_8822ce	00.0 Network controller: Realtek Semiconductor Co., Ltd. RTL8822CE 802.11ac PCIe Wireless Network Adapter
            (mac80211 monitor mode already enabled for [phy0]wlp1s0 on [phy0]10)


Now, we're ready to sniff some packets, I guess.

### Capturing a WPA Handshake

To quickly test passwords for an access point, I can capture a **WPA handshake** which contains the answer to the one-way hash function that the password is compared with. This allows me to "brute-force" millions of passwords by comparing them to the fake "password" found inside the WPA handshake I captured.

But to do all of that, first I need to capture a WPA handshake as it occurs. This can be done using the `airodump-ng` and `aireplay-ng` commands from the aircrack-ng suite.

**airodump-ng** is the main tool responsible for selecting a target network and capturing the handshake I need. **aireplay-ng** is a tool used to send de-authentication attacks to the access point, which will come into play later.

-- TODO: FINISH ARTICLE --