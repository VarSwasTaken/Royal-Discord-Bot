require('dotenv').config();

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// function to check if passed URL is a correct YouTube link
const validateYouTubeUrl = (url) => {
    if (url != undefined || url != '') {
        let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        let match = url.match(regExp);
        if (match && match[2].length == 11)
            return true;
        return false;
    }
    return false;
}

const vidIdFromUrl = (url) => {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11)
        return match[2];
    else 
        console.log("Wrong video id");
}

// function to add zero before hours/minutes if less than 10
const fillZeros = (num) => {
    return num.toString().padStart(2, '0');
}

const content = async (interaction, client) => {
    // load values
    const user = interaction.user.tag;
    const filePath = '../text_files/cooldowns.txt';
    const cooldown = 1000 * 60 * 60 * 24 * 3; // 3 days in milliseconds
    const RN_discord = 'https://discord.gg/3rnuezcSCx';
    const media_channel = client.channels.cache.find(channel => channel.name === 'bot-testing');
    let link = interaction.options.get('link').value;
    let lastUsed = 0;

    // if link doesn't start with "https://www.", add it to the link
    if (link[0] != 'h')
        link = `https://${link}`

    // read from cooldowns.txt file
    fs.readFile(path.resolve(__dirname, filePath), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // create an array with lines of the text file as objects
        let cooldowns = data.split('\n');
        cooldowns.pop();

        // go throught the lines to check if the user has ever posted a video
        for (let line = 0; line < cooldowns.length; line++) {
            // get info of the user
            let info = cooldowns[line].split(" ");
            let name = info[0];

            // if user already exists in the file, it means he already had posted a video before and had a cooldown applied
            if (name === user) {
                lastUsed = info[1];
                cooldowns.splice(line, 1); // remove already existing cooldown
                break;
            }
        }

        // check if everything is fine with the video
        // check if the link is a valid YouTube link
        if (validateYouTubeUrl(link)) {
            // check if the cooldown has ended (3 days passed)
            if (Date.now() - lastUsed > cooldown) {
                // check if video contains Discord link in the descripion
                const vid_id = vidIdFromUrl(link);
                google.youtube('v3').videos.list({
                    id: vid_id,
                    key: process.env.GOOGLE_API_KEY,
                    part: 'snippet',
                    type: 'video'
                }).then((response) => {
                    let description = response.data.items[0].snippet.localized.description;
                    if (description.includes(RN_discord)) {
                        // push the user's new cooldown with current date to the array
                        let today = Date.now();
                        cooldowns.push(`${user} ${today}`);

                        // write everything back to the file after adding/updating a user
                        let file = fs.createWriteStream(path.resolve(__dirname, filePath));
                        file.on('error', (err) => {
                            console.log(err);
                        });
                        cooldowns.forEach(line => {
                            file.write(line + '\n');
                        });
                        file.end();

                        // send the video to the channel and respond to the user
                        media_channel.send(`_<@${interaction.user.id}> has uploaded a video!_
                        ${link}
                        
                        <@&1063171568827633724>`.replace(/  +/g, ''));
                        interaction.reply({ content: '_The video link was successfully sent to the <#869912797750890606> channel!_', ephemeral: true });
                    }
                    else
                        interaction.reply({ content: `_This YouTube video doesn't contain the correct Royal Network's Discord link (${RN_discord}) in the description. Please, fix the issue and try again._`, ephemeral: true })
                }).catch((err) => console.log(err));
            }
            else {
                let timeLeft = cooldown - (Date.now() - lastUsed);
                let seconds = Math.floor(timeLeft / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);
                let days = Math.floor(hours / 24);
                minutes = minutes % 60;
                hours = hours % 24;
                interaction.reply({
                    content: `_You're only allowed to post a video once per 3 days. 
                Your cooldown ends in ${days}D : ${fillZeros(hours)}H : ${fillZeros(minutes)}M._`.replace(/  +/g, ''), ephemeral: true
                });
            }
        }
        else
            interaction.reply({ content: '_The provided link was incorrect. Please, resend the command with a proper YouTube video link._', ephemeral: true });
    });
}

module.exports = content;