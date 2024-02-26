---
title: Syncthing
description: Syncthing synchronization program, linux, macos, synology dsm installation and configuration
template: comments.html
tags: [syncthing, automation, linux, macos, synology, windows]
---

# Syncthing

![Syncthing Logo][syncthing-logo-img]{: style="width:600px"}

[Syncthing][syncthing-homepage-url]{target=\_blank} is a continuous file synchronization program. Syncthing is an application that allows you to synchronize files between multiple devices. This means that creating, editing, or deleting files on one computer can be automatically copied to other devices.

Official website: [syncthing.net][syncthing-homepage-url]{target=\_blank}

## Debian/Ubuntu Installation

We need to add the following `Syncthing` repository to the system.

First, we need to add PGP keys to allow the system to check the packages authenticity

```shell
sudo curl -s -o /usr/share/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg
```

Then we will add the `stable Syncthing` repository channel to your APT sources

```shell
echo "deb [signed-by=/usr/share/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list
```

Now we can update the package list and install Syncthing

```shell
sudo apt update
sudo apt install syncthing
```

### Configuration Syncthing as a Service

Configuring Syncthing as a service will provide as the ability to start and stop and enable/disable the service at boot.

Create a systemd unit file for managing the Syncthing service.

```shell
nano /etc/systemd/system/syncthing@.service
```

In the next example we will be setting the `Syncthing` service UI to listen on local host (127.0.0.1) and port 8384

Add the following lines to the `syncthing@.service`:

```toml
[Unit]
Description=Syncthing - Open Source Continuous File Synchronization for %I
Documentation=man:syncthing(1)
After=network.target

[Service]
User=%i
ExecStart=/usr/bin/syncthing -no-browser -gui-address="127.0.0.1:8384" -no-restart -logflags=0
Restart=on-failure
SuccessExitStatus=3 4
RestartForceExitStatus=3 4

[Install]
WantedBy=multi-user.target
```

Save and close the file when you are finished. Then, reload the systemd daemon to apply the configuration:

```shell
systemctl daemon-reload
```

Next, start the Syncthing service with the following command depending on a user this example is `root`

```shell
systemctl start syncthing@root
```

To verify the status of the Syncthing service, run the following command:

```shell
systemctl status syncthing@root
```

Finally, enabled the syncthing service on boot

```shell
systemctl enable syncthing@root
```

## MacOS Installation

You can download the MacOS installation package from [Syncthing Downloads][syncthing-downloads-url]{target=\_blank}, But my preferred way is to use the [Homebrew][homebrew-url]{target=\_blank} package manager.

```shell
brew install --cask syncthing
```

## Windows Installation

Window installation from [Syncthing Downloads][syncthing-downloads-url]{target=\_blank} installs the Syncthing as a service without any system tray icon or menu.

The best way I found is to use `SyncTrayzor` from [SyncTrayzor Github Page][sync-trayzor-url]{target=\_blank}. It hosts and wraps Syncthing, making it behave more like a native Windows application and less like a command-line utility with a web browser interface.

You can also instal it win `winget` with the following command:

```powershell
winget install SyncTrayzor.SyncTrayzor
```

## Synology DSM Installation

In order to install Syncthing, we need to add 3rd party packages to Synology DSM.
[Synology Community Packages][synocommunity-url]{target=\_blank} provides packages for Synology-branded NAS devices.

After we added `Synology Community Packages` you will be able to install Syncthing from the `Cummunity` tab.

Permissions for the Syncthing service will be handled by the new system user `sc-syncthing`

![Synology Permission][synology-permission-img]

## Syncthing Configuration

The following configuration are the same for all the installation methods. I'm no going to cover the basic configuration, but I will show you some of my personal preferences.

First to configure the Syncthing we need to access it's Web UI. The Default url is [http://127.0.0.1:8384][syncthing-web-ui-url]{target=\_blank}

If you are using `Syncthing` at remote Linux host, you can use SSH tunnel to access the Web UI.

```shell
ssh  -L 8001:127.0.0.1:8384 root@192.168.102.6
```

This will forward `127.0.0.1:8384` from the remote host to `127.0.0.1:8001` on the local host.

For security reasons, I like to disable all the Discovery and Repay services.

![Syncthing Disable Discovery][syncthing-disable-discovery-img]

When you disable the Discovery service, you will have to manually add the connection to other devices.

### Manual Connection Example

```shell
tcp://192.168.1.1:22000
```

or

```shell
tcp://example.com:22000
```

![Syncthing Manual Connection][syncthing-manual-connection-img]

## Syncthing Files Ignore Patterns

Syncthing supports of `Ignore Patterns` you can use it to `Ignore Files` synchronization. ==This will save you a lot of headaches with sync errors==

Here is a list of the `Ignore Patterns` for system files:

```list
// Apple macOS
(?d).DS_Store
(?d).localized
(?d)._*
(?d).Icon*
(?d).fseventsd
(?d).Spotlight-V100
(?d).DocumentRevisions-V100
(?d).TemporaryItems
(?d).Trashes
(?d).Trash-1000
(?d).iCloud
(?d)Photos Library.photoslibrary

// GNU/Linux
(?d).directory
(?d).Trash-*

// Microsoft Windows
(?d)desktop.ini
(?d)ehthumbs.db
(?d)Thumbs.db
(?d)$RECYCLE.BIN
(?d)System Volume Information

// QNAP QTS
(?d).AppleDB
(?d).@_thumb
(?d).@__thumb

// Synology DSM
(?d)@eaDir

// Adobe Lightroom
*Previews.lrdata root-pixels.db

// Dropbox
.dropbox
.dropbox.attr

// Firefox & Chrome
*.part
*.crdownload

// Microsoft Office
~*

// Parallels Desktop for Mac
.parallels-vm-directory

// Resilio Sync
.sync
*.bts
*.!Sync
.SyncID
.SyncIgnore
.SyncArchive
*.SyncPart
*.SyncTemp
*.SyncOld

// Temporary and backup files
*.temporary
*.tmp
*._mp
*.old
*.syd
*.dir
*.gid
*.chk
*.dmp
*.nch
.*.swp
*~

// Vim
*.*.sw[a-p]
```

Example of working `Syncthing` Web UI:

![Syncthing Web UI][syncthing-web-ui-img]

<!-- appendices -->

<!-- urls -->

[syncthing-homepage-url]: https://syncthing.net/ 'Syncthing Homepage'
[syncthing-downloads-url]: https://syncthing.net/downloads/ 'Syncthing Downloads'
[homebrew-url]: https://brew.sh/ 'Homebrew'
[sync-trayzor-url]: https://github.com/canton7/SyncTrayzor 'SyncTrayzor Github Page'
[synocommunity-url]: https://synocommunity.com/ 'Synology Community Packages'
[syncthing-web-ui-url]: http://127.0.0.1:8384 'Syncthing Web UI'

<!-- images -->

[syncthing-logo-img]: ../assets/images/38e8b558-c171-11ec-90fd-b729b54a6117.jpeg 'Syncthing Logo'
[synology-permission-img]: ../assets/images/7e575fea-c176-11ec-901c-df3a98406bd7.jpg 'Synology Permission'
[syncthing-disable-discovery-img]: ../assets/images/ceb5e792-c179-11ec-ad88-9b78dd851902.jpg 'Syncthing Disable Discovery'
[syncthing-manual-connection-img]: ../assets/images/3fa4685c-c17a-11ec-94bb-b32aa327a5b7.jpg 'Syncthing Manual Connection'
[syncthing-web-ui-img]: ../assets/images/448ea1b0-c17b-11ec-a195-77168778849d.jpg 'Syncthing Web UI'

<!--css-->

<!-- end appendices -->
