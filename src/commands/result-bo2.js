const { createCanvas, loadImage, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');
const sizeOf = require('image-size');
const path = require('path');

const { applyText, resizeImage } = require("../functions");

const result_bo2 = async (interaction) => {
    // registering montserrat font
    registerFont(path.resolve(__dirname, '../fonts/Montserrat-Bold.ttf'), { family: 'Montserrat' });

    // creating canvas
    await interaction.reply(`_Preparing the design... <a:Loading:996805501180448799>_`);
    const canvas = createCanvas(3840, 2160);
    const context = canvas.getContext('2d');

    // loading and changing background and rectangles if draw
    const map1_winner = interaction.options.get('map-1-winner').value;
    const map2_winner = interaction.options.get('map-2-winner').value;
    let background, rectangles;
    if(map1_winner == map2_winner) {
        background = await loadImage(path.resolve(__dirname, '../images/map_pictures') + '/' + interaction.options.get('map-1').value + '.jpg');
        rectangles = await loadImage(path.resolve(__dirname, '../images/results-rectangles.png'));
    }
    else {
        background = await loadImage(path.resolve(__dirname, '../images/map_pictures') + '/' + interaction.options.get('map-1').value + '2.jpg');
        rectangles = await loadImage(path.resolve(__dirname, '../images/results-rectangles2.png'));
    }

    // loading the background and other images
    const winner_logo = resizeImage(await loadImage(interaction.options.get('first-team-logo').attachment.url), 1523);
    const loser_logo = resizeImage(await loadImage(interaction.options.get('second-team-logo').attachment.url), 1523);
    const tournament_logo_src = path.resolve(__dirname, '../images/tournament_logos') + '/' + interaction.options.get('tournament-logo').value + '.png';
    const tournament_logo = await loadImage(tournament_logo_src);
    const rectangles2 = await loadImage(path.resolve(__dirname, '../images/results-rectanglesblack.png'));

    // cutting and placing images on the design
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    let sx = (1523 - 743) / 2;
    let sy = 0;
    let sw = 743;
    let sh = 1523;
    let dw = 743;
    let dh = 1523;
    context.drawImage(winner_logo, sx, sy, sw, sh, 1109 - (743 / 2), 996.5 - (1523 / 2), dw, dh);
    context.drawImage(loser_logo, sx, sy, sw, sh, 2730.5 - (742 / 2), 996.5 - (1523 / 2), dw, dh);
    context.drawImage(tournament_logo, canvas.width / 2 - sizeOf(tournament_logo_src).width / 2, canvas.height / 2 - 420);
    context.drawImage(rectangles2, 0, 0, canvas.width, canvas.height);
    context.drawImage(rectangles, 0, 0, canvas.width, canvas.height);

    // loading text values
    const tournament_name = interaction.options.get('tournament-name').value;
    const tournament_round = interaction.options.get('tournament-round').value.toUpperCase();
    const map1 = interaction.options.get('map-1').value.toUpperCase();
    const map2 = interaction.options.get('map-2').value.toUpperCase();
    const loser1_rounds = interaction.options.get('loser-1-rounds').value;
    const loser2_rounds = interaction.options.get('loser-2-rounds').value;
    const winner_name = interaction.options.get('first-team-name').value;
    const loser_name = interaction.options.get('second-team-name').value;

    // setting text style & placing texts on the design
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = "middle";
    // match score
    context.font = '160px Montserrat';
    if (map1_winner === map2_winner) {
        context.fillText('2', 1109, 1700.5);
        context.fillText('0', canvas.width - 1109, 1700.5);
    }
    else {
        context.fillText('1', 1109, 1700.5);
        context.fillText('1', canvas.width - 1109, 1700.5);
    }
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
    // map 1
    let map1_string, map2_string, map3_string;
    if (map1_winner === 'first')
        map1_string = '13 ' + map1 + ' ' + loser1_rounds;
    else
        map1_string = loser1_rounds + ' ' + map1 + ' 13';
    context.font = applyText(canvas, map1_string, 40, 800);
    context.fillText(map1_string, canvas.width / 2, canvas.height / 2 + 150);
    // map 2
    if (map2_winner === 'first')
        map2_string = '13 ' + map2 + ' ' + loser2_rounds;
    else
        map2_string = loser2_rounds + ' ' + map2 + ' 13';
    context.font = applyText(canvas, map2_string, 40, 800);
    context.fillText(map2_string, canvas.width / 2, canvas.height / 2 + 200);

    // send the design back to the user
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'tournament.png' });
    await interaction.editReply({ content: null, files: [attachment] });
}

module.exports = result_bo2;