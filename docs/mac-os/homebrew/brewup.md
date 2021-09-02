---
description: Brewup script is a Bash script that uses [Homebrew - The Missing Package Manager for macOS](https://brew.sh/) as it's base.Brewup uses GitHub as a "backup" of a config file which contains all installed Taps, Formulas, Casks and App Store Apps at your macOS. It also allows the use of __Github__ main function of retaining changes so you can always look up for the package that were installed sometime ago and you just forgot what is was exactly.
---

# BrewUp - macOS Auto Update Homebrew

<p align="center">
    <img src="https://w.3os.org/3os/brewup/Cover.jpg" width=500>
</p>

## Download and Installation

__To download and  BrewUp follow this link:__  
[BrewUp Download and Installation Guide](https://github.com/fire1ce/BrewUp)

## Description

Brewup script is a Bash script that uses [Homebrew - The Missing Package Manager for macOS](https://brew.sh/) as it's base.
Brewup uses GitHub as a "backup" of a config file which contains all installed Taps, Formulas, Casks and App Store Apps at your macOS. It also allows the use of __Github__ main function of retaining changes so you can always look up for the package that were installed sometime ago and you just forgot what is was exactly.

## What Brewup Actually Does

It just runs few [Brew functionality](https://docs.brew.sh/) automatically:

* brew doctor
* brew missing
* brew upgrade
* brew cask upgrade
* brew cleanup
* App Store Updates
* Creating Updated [Brewfile](https://github.com/Homebrew/homebrew-bundle)
* Pushing changes to Git
