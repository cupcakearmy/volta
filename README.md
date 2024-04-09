> ⚠️ There is a really good app now! (Makes this project obsolete, fortunately)
> 
> https://github.com/AppHouseKitchen/AlDente-Charge-Limiter

[![Join the chat at https://gitter.im/cupcakearmy/cca-volta](https://badges.gitter.im/cupcakearmy/cca-volta.svg)](https://gitter.im/cca-volta/Lobby)

# Volta ⚡️

> **Partial obsolete as of June 2020**
>
> Apple introduced macOS 10.15.5 with integrated support for battery health management, making this utility app kind of obsolete for the newer macbooks.
>
> Read more about this [here](https://support.apple.com/en-us/HT211094)

Battery assistant for prolonging the lifespan of your battery. Runs in the background, has configurable limits and can be enabled to run on startup.

[Screenshot](#screen)

### [Download](https://github.com/CupCakeArmy/volta/releases)

## Contributions 🙏

- https://github.com/daaanny90 dark mode support

## What does it do?

Good question. It gives you notifications about when to plug and unplug your charger. 

> Cool, but why?

Batteries loose the most capacity if the voltage difference is high, or staying at 100%. Hence, if you you use your laptop most of the time plugged in, it will decrease the capacity of the battery quicker than normal.

To sum up, you should **not**:

- Charge you battery **regulary** over 80-90%
- Discharge under 30-40%

Reference to the science:

- http://batteryuniversity.com/learn/article/how_to_prolong_lithium_based_batteries
- https://www.popsci.com/charge-batteries-right


## Quickstart 💥

[Download](https://github.com/CupCakeArmy/volta/releases). Run.

## Feedback

Remember this is pretty new software wrote in ~2days, so if you encounter bugs or have feature requests please let me know!

## Build 🔨

There are prebuilt binaries for macOS [here](https://github.com/CupCakeArmy/volta/releases). However you can also complile them yourself.

```bash
# Install dependencies
npm i

# Build the app
npm run pack:all
```

### Screen

![Screenshot](https://i.imgur.com/DX8mjRE.png)
