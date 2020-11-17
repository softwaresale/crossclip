# Crossclip

A device-agnostic cloud-based clipboard manager

Use it [here](https://crossclip.web.app)

Electron version: [here](#)

## What is Crossclip?
Crossclip is a clipboard manager built for the modern web. The primary purpose of Crossclip is to make it easier to share
clipboard contents across multiple devices. It provides a simple cloud-based system for saving your local clipboard
contents remotely and then accessing them across multiple devices. You can easily copy some text on your phone and then
paste it on your mac, pc, or iPad or any devices that can access the internet and has a web browser.

## Getting Started
It's easy to get started:
1. Go to [https://crossclip.web.app](https://crossclip.web.app) or download the electron version for your computer.
2. Create an account or sign in with google.
3. Start using Crossclip!

## Limitation
Although Crossclip has a fair amount of flexibility, it has its limitations too. Crossclip is a Progressive Web App (PWA).
A [PWA](https://web.dev/progressive-web-apps/) is a website designed to have a user experience similar to a native app.
Thanks to its heavy foundation on the web, Crossclip is cross-platform and portable. The drawback however is that the app
lacks some features found in true native apps. Some of these short comings are mitigated with electron, which allows
the app to leverage some system apis and features. However, these features are not available on the web version. Some
limitations of the web version include:
* No updating local clipboard contents in the background

For security reasons, the current browser-based clipboard API is not permitted to access the system while the DOM is
not focused. This is honestly for the best, but it means that in order to make your contents show up, you must open
up the web app. This issue does not exist on the electron version.

* Limited content types

For now, Crossclip primarily supports plain text for copying and pasting. This limited range is due to both the infancy
of this application and the novelty of the browser-based clipboard API. As the app grows and the APIs advance, I intend
to make the app for diverse. 
