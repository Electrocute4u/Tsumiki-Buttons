# Tsumiki Buttons
A simple NPM package for creating buttons on Discord \
Mainly created for [Tsumiki](https://github.com/Electrocute4u/Tsumiki), a Discord Bot written in Javascript.


## Table of contents
<details>
<summary>"Click to expand"</summary>
 
- [Install](#install)
- [Dependencies](#dependencies)
- [Options](#options)
- [Setup](#setup)
- [Standard Method](#standard-method)
- [Example](#example)

</details>

## Install
```sh
npm install tsumiki-buttons
```
## Dependencies
- `discord-buttons` v^3.2.1 ([LINK](https://www.npmjs.com/package/discord-buttons))

## Options

| FIELD          | TYPE          | DESCRIPTION | DEFAULT |
| :------------- |:-------------:|:-----------:|:-------:|
| userID  | Object | The Discord user ID who can control the buttons |
| timeout | Number | Timeout in milliseconds, max is 300000 (5 minutes) |
| color | string? | The button color. Currently supports Red, Green, Blurple and Gray | 'Gray'
| embeds | Array | The embeds to use for each page in chronological order. |
| emojiBack | string?  | The Emoji used for the back button. This supports Custom Emojis! | `<<` |
| emojiNext | string? | The Emoji used for the next button. This supports Custom Emojis! | `>>`


## Setup
```js
const discord = require('discord.js');
const client = new discord.Client();

// Both of these have to be below your discord.Client()
require("discord-buttons")(client);
require('discord-slider')(client); 
```

## Standard Method
```js
<message>.channel.createSlider(userID, timeout, color, embeds, emojiBack, emojiNext)
```
- userID refers to the one who can trigger the buttons. Make sure to get the user ID.
- The max timeout value is 5 minutes (300000), this value is in milliseconds.
- By default, the color value is Grey. However, it also supports Red, Green and Blurple.
- If you don't pass in a parameter for either `emojiBack` or `emojiNext` or only for one, they will automatically default to "<<" and ">>".

## Example
- The order of the embeds in the array will be the order of the pages.
### Example - Ordinary Emoji
Get a Red button with 1 minute timeout, which has 4 different pages, using the two emojis that's not Discord emojis.
```js
<message>.channel.createSlider(<message>.author.id, 60000, "Red", [embed0, embed1, embed2, embed3], "⬅", "➡")
```

### Example - Custom Discord Emoji
Get a Blurple button with 1 minute timeout, which have 2 different pages, using 2 Custom Discord Emojis as arrows.
```js
<message>.channel.createSlider(<message>.author.id, 60000, "Blurple", [embed0, embed1], "<:SmugTama:699030647024517200>", "<:02smug:587111714747711490>")
```
- You can also just copy the Emoji ID (i.e 699030647024517200 from "<:SmugTama:699030647024517200>") and place it in. \
Will not work for just the emoji name. But you can paste the entire emoji in the command and it will be automatically converted.