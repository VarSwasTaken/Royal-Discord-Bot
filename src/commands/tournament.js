const { createCanvas, loadImage, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');
const path = require('path')

const functions = require('../functions');

const tournament = async (interaction) => {
    // registering montserrat font
    registerFont(path.resolve(__dirname, '../fonts/Montserrat-Bold.ttf'), { family: 'Montserrat' })

    // creating canvas
    await interaction.reply(`_Preparing the design... <a:Loading:996805501180448799>_`);
    const canvas = createCanvas(1323, 268);
    const context = canvas.getContext('2d');

    // loading the background
    const background = await loadImage(path.resolve(__dirname, '../images/tournaments-background.jpg'));
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    // loading tournament name from the user
    let tournament = interaction.options.get('name').value.toUpperCase();

    // setting text style & placing text on the design
    context.font = functions.applyText(canvas, tournament, 90, canvas.width - 200);
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = "middle";
    context.fillText(tournament, canvas.width / 2, canvas.height / 2);
    
    // sending the design back to the user
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'tournament.png' });
    await interaction.editReply({ content: null, files: [attachment] });
}

module.exports = tournament;