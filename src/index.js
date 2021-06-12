const { Structures } = require("discord.js");

module.exports = (client) => {
    const { MessageButton, MessageActionRow } = require("discord-buttons");
    
    class TextChannel extends Structures.get("TextChannel") {
/**
 *  Tsumiki's upgraded and more customizeable Button system. Specifically designed for Tsumiki Discord Bot.
 *
 * @param {Object} userID The Discord user ID who can controls the buttons. 
 * @param {Number} timeout Timeout in milliseconds, max is 300000 (5 minutes).
 * @param {string} color The button color. Currently supports Red, Green, Blurple and Gray [Default: Gray]
 * @param {Array} embeds The embeds to use for each page in chronological order.
 * @param {string} emojiBack The Emoji used for the back button. This supports Custom Emojis! [Default: <<]
 * @param {string} emojiNext The Emoji used for the next button. This supports Custom Emojis! [Default: >>]
 *
 * @returns {Promise<object>}
 */
        async createSlider(userID, timeout, color = "grey", embeds, emojiBack, emojiNext) {
            
            if(color && isNaN(color) === true) {
            const colorSupportList = ["red", "green", "blurple"]

            if(colorSupportList.includes(color.toLowerCase() )){
                color = color.toLowerCase()
            } else { color = `gray`}
    
            } 
            else { color = `gray`}

            const button_back = new MessageButton()
                .setStyle(`${color}`)
                .setID('back');

            const button_next = new MessageButton()
                .setStyle(`${color}`)
                .setID('next');

            const button_back_disabled = new MessageButton()
                .setStyle(`${color}`)
                .setID('back_disabled')
                .setDisabled();

            const button_next_disabled = new MessageButton()
                .setStyle(`${color}`)
                .setID('next_disabled')
                .setDisabled();

            if (emojiNext && emojiBack) {
                
                if(emojiBack.startsWith("<:")){
                // Cuts the ID out for Custom Emoji support
                let emoji = emojiBack.substring(
                emojiBack.lastIndexOf(":") + 1, 
                emojiBack.lastIndexOf(">")
                );
                    emojiBack = emoji
                }

                if(emojiNext.startsWith("<:")){
                // Cuts the ID out for Custom Emoji support
                let emoji = emojiNext.substring(
                emojiNext.lastIndexOf(":") + 1, 
                emojiNext.lastIndexOf(">")
                );
                    emojiNext = emoji
                }
                button_back.setEmoji(emojiBack)
                button_next.setEmoji(emojiNext)
                button_back_disabled.setEmoji(emojiBack)
                button_next_disabled.setEmoji(emojiNext)
            }
            else {
                button_back.setLabel('<<');
                button_next.setLabel('>>');
                button_back_disabled.setLabel('<<');
                button_next_disabled.setLabel('>>');
            };
        
            if(!timeout){
                timeout = 60000
            }
            if(isNaN(timeout) === true) {
                return console.warn("The provided number for timeout is not a valid number!")
            }
            if(timeout >= 300000){
                timeout = 300000
            }

            if(!embeds.constructor === Array) return console.warn("Please include the embeds in an array. This can be easily done with []")
            if(embeds.length <=1) return console.warn("Cannot create buttons with just a single embed! Please include 2 or more embeds!")

            const buttonsActive = new MessageActionRow()
                .addComponents([button_back, button_next]);

            const buttonsDisabled = new MessageActionRow()
                .addComponents([button_back_disabled, button_next_disabled]);

            this.send({ embed: embeds[0], component: buttonsActive }).then(msg => {
                const collector = msg.createButtonCollector((button) => userID === userID, { time: timeout });
        
                let currentPage = 0;
            
                collector.on('collect', button => {
                    button.defer();

                    if (button.clicker.user.id == userID) {
                        if (button.id == "back") {
                            if (currentPage !== 0) {
                                --currentPage;
                                msg.edit({embed:embeds[currentPage], component: buttonsActive});
                            } else {
                                currentPage = embeds.length - 1
                                msg.edit({embed:embeds[currentPage], component: buttonsActive});
                            };
                        }
    
                        else if (button.id == "next"){
                            if (currentPage < embeds.length - 1) {
                                currentPage++;
                                msg.edit({embed:embeds[currentPage], component: buttonsActive});
                            } else {
                                currentPage = 0
                                msg.edit({embed:embeds[currentPage], component: buttonsActive});
                            };
                        };
                    };
                });
                collector.on('end', collected => {
                    msg.edit({ embed: embeds[0], component: buttonsDisabled })
                });
                collector.on("error", (e) => console.log(e))
            })
        }
    };

    Structures.extend("TextChannel", () => TextChannel);
}