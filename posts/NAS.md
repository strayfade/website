{
"title": "Cloud Storage",
"description": "Turning a Raspberry Pi and spare SSDs into a private cloud storage solution",
"tags": ["Raspberry Pi", "Linux"],
"author": "Noah",
"date": "12/7/2023",
"showTitle": true,
"indexed": false,
"disableHighlighting": true,
"pinned": false
}

### What is a NAS?

**NAS** stands for Network-Attached Storage. This is usually one or more drives that can be accessed remotely from another computer or network.

The real question is why somebody would create a storage server, instead of relying on an inexpensive cloud-storage solution such as Dropbox or Google Drive. However, creating your own NAS can be a very fun project for people new to the networking space. Creating your own NAS instead of using an online solution offers many benefits:

-   It is usually very cheap ($/GB) compared to traditional online cloud storage, since you get to buy the drives yourself.
-   You personally **own** all of your drives, and have access to all of them!
-   It is very secure, and you define exactly who has access to shared files/folders/drives.
-   Storage is easily expandible later on.
-   It's fun!

### Why Raspberry Pi?

In case you've been living under a rock, a Raspberry Pi is an inexpensive bare-bones computer that can be used for a variety of tasks and applications. Most official Raspberry Pi computers use Broadcomm ARM processors, and they usually run operating systems forked from the ARM versions of common Linux OSes like Debian or Ubuntu. Raspberry Pi itself ships with the operating system Raspbian, which is a modified, lightweight version of Debian Linux.

Although a NAS can be created on nearly any operating system or computer, Raspberry Pi computers are a small, inexpensive way to provide a dedicated computer for your NAS.

### Making a NAS

Firstly, let's see what components are required to make a NAS.

-   A computer (preferably a Raspberry Pi or a similar single-board computer with at least 2GB RAM)
-   Your drives
-   **Important:** A dedicated, _powered_ USB hub (especially if you are using HDDs over a USB connection)
-   A wired Ethernet connection (ideally)
-   A power source (newer Raspberry Pis require 5V/3A over USB-C)

As for our OS, I'm using Raspbian (Debian) Bullseye, booting from a 16GB MicroSD card. For instructions on how to flash and boot an operating system on a Raspberry Pi, check [here](https://www.raspberrypi.com/documentation/computers/getting-started.html).

Additionally, you can purchase specialized cases or enclosures that support a Raspberry Pi and one or more drives.

### Software Setup

First, we need to find the `/dev/` mount points for any connected drives:

    sudo fdisk -l

The output of this command shows that we have two external drives connected and mounted on `/dev/sda` and `/dev/sdb`. To unmount the partitions of these drives, we can run the following command:

    umount /dev/sda1

This will need to be ran for every drive that will later be formatted. To format and re-partition the drives, we can use the `parted` command-line tool included with Raspbian.

    sudo parted /dev/sda

    mklabel gpt

    mkpart
    [Name your drive]
    Filesystem: ext4
    Start: 0%
    End: 100%

    quit

Now that the drive has been re-partitioned, create the `ext4` filesystem using the following command:

    sudo mkfs.ext4 /dev/sda1

Finally, add a drive label:

    sudo e2label /dev/sda1 [Name of your drive]

Next, reboot your Pi to apply all changes and mount the drives:

    sudo shutdown -r now

### Samba Shares

To install Samba, run the following command:

    sudo apt install samba samba-common

Samba is a service that will allow SMB connections to interact with the drives connected to your computer.

Once it has installed, edit the configuration file at `/etc/samba/smb.conf`

    sudo nano /etc/samba/smb.conf

Add entries for all of the drives you wish to make accessible to the configuration file. Make sure to replace `Drive1` here with the name of your shared drive, and replace `pi` with your login username.

    [Drive1]
    path = /media/pi/Drive1/
    writeable = yes
    create mask = 0775
    directory mask = 0775
    public=no

After exiting the text editor, you can take ownership of the drive on the `pi` user, so that you can read and write to it. Here, replace `pi` with your username again.

    sudo chown -R pi /media/pi/Drive1

Now, you can use this command to set/change the SMB password for the default user (either `pi` or your own username)

    sudo smbpasswd -a pi

To apply these changes, restart the SMB service.

    sudo systemctl restart smbd

### Accessing your new NAS

One thing that is important to note is that by default, your shares will only be available to other computers on your local network. By default, SMB uses ports **139** and **445**, which will need to be port-forwarded to be accessed from another network. Many residential ISPs block these ports though, so you may need to edit your configuration file and add the line `smb ports = 8139 8445` or change the ports to your liking. One thing that is worth noting, though, is that some programs will break if the SMB connection is not running on the default ports (I'm looking at **you**, Windows File Explorer). Other file browsers will usually allow you to connect to a custom port by specifying it manually.

You will need to use credentials when connecting, which will be the username of the Raspberry Pi as well as the custom SMB password that was set earlier.

To access your shares on a **Windows** computer, you can use the File Explorer's **"Map Network Drive"** option. When connecting, use the path `\\[IP]\Share` where IP is the Pi's private IP address, and Share is the name of the drive you configured. If you are using a custom port and port-forwarding the connection, then you will want to connect to your public IP and change the port accordingly. Since Windows ([currently](https://techcommunity.microsoft.com/t5/storage-at-microsoft/smb-alternative-ports-now-supported-in-windows-insiders/ba-p/3974509)) will not allow you to change the default SMB port for connections, you will likely need to download a third-party file explorer, such as [OwlFiles](https://www.skyjos.com/owlfiles/).

To access your shares on OSX, you can connect to them in Finder, adding on a custom port if needed.

To access your shares on Linux, you'll have to figure it out yourself, just like you do everything else.

### References

-   [https://www.raspberrypi.com/documentation/computers/getting-started.html](https://www.raspberrypi.com/documentation/computers/getting-started.html)
-   [https://techcommunity.microsoft.com/t5/storage-at-microsoft/smb-alternative-ports-now-supported-in-windows-insiders/ba-p/3974509](https://techcommunity.microsoft.com/t5/storage-at-microsoft/smb-alternative-ports-now-supported-in-windows-insiders/ba-p/3974509)
