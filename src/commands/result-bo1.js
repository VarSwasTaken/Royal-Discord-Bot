const { createCanvas, loadImage, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');
const sizeOf = require('image-size');
const path = require('path');

const { applyText, resizeImage } = require("../functions");

const result_bo1 = async (interaction) => {
    // registering montserrat font
    registerFont(path.resolve(__dirname, '../fonts/Montserrat-Bold.ttf'), { family: 'Montserrat' });
    
    // creating canvas
    await interaction.reply(`_Preparing the design... <a:Loading:996805501180448799>_`);
    const canvas = createCanvas(3840, 2160);
    const context = canvas.getContext('2d');

    // loading the background and other images
    const background = await loadImage(path.resolve(__dirname, '../images/map_pictures') + '/' + interaction.options.get('map').value + '.jpg');
    const winner_logo = resizeImage(await loadImage(interaction.options.get('winner-logo').attachment.url), 1523);
    const loser_logo = resizeImage(await loadImage(interaction.options.get('loser-logo').attachment.url), 1523);
    const tournament_logo_src = path.resolve(__dirname, '../images/tournament_logos') + '/' + interaction.options.get('tournament-logo').value + '.png';
    const tournament_logo = await loadImage(tournament_logo_src);
    const rectangles = await loadImage(path.resolve(__dirname, '../images/results-rectangles.png'));
    const rectangles2 = await loadImage(path.resolve(__dirname, '../images/results-rectanglesblack.png'));

    // cutting and placing images on the design
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    let sx = (1523-743) / 2;
    let sy = 0;
    let sw = 743;
    let sh = 1523;
    let dw = 743;
    let dh = 1523;
    context.drawImage(winner_logo, sx, sy, sw, sh, 1109 - (743/2), 996.5 - (1523/2), dw, dh);
    context.drawImage(loser_logo, sx, sy, sw, sh, 2730.5 - (742/2), 996.5 - (1523/2), dw, dh);
    context.drawImage(tournament_logo, canvas.width / 2 - sizeOf(tournament_logo_src).width / 2, canvas.height / 2 - 420);
    context.drawImage(rectangles2, 0, 0, canvas.width, canvas.height);
    context.drawImage(rectangles, 0, 0, canvas.width, canvas.height);

    // loading text values
    const tournament_name = interaction.options.get('tournament-name').value;
    const tournament_round = interaction.options.get('tournament-round').value.toUpperCase();
    const map = interaction.options.get('map').value.toUpperCase();
    const loser_rounds = interaction.options.get('loser-rounds').value;
    const winner_name = interaction.options.get('winner-name').value;
    const loser_name = interaction.options.get('loser-name').value;

    // setting text style & placing texts on the design
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = "middle";
    // match score
    context.font = '160px Montserrat';
    context.fillText('13', 1109, 1700.5);
    context.fillText(loser_rounds, canvas.width - 1109, 1700.5);
    // tournament information
    context.font = applyText(canvas, tournament_name, 30, 800);
    context.fillText(tournament_name, canvas.width / 2, canvas.height / 2 - 40);
    context.font = applyText(canvas, tournament_round, 100, 800);
    context.fillText(tournament_round, canvas.width / 2, canvas.height / 2 + 30);
    // team names
    context.font = applyText(canvas, winner_name, 80, 650);
    context.fillText(winner_name, 1109, 1480);
    context.font = applyText(canvas, loser_name, 80, 650);
    context.fillText(loser_name, canvas.width - 1109, 1480);
    // map
    context.font = applyText(canvas, map, 40, 800);
    context.fillText(map, canvas.width / 2, canvas.height / 2 + 150);

    // sending the design back to the user
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'tournament.png' });
    await interaction.editReply({ content: null, files: [attachment] });
}

module.exports = result_bo1;