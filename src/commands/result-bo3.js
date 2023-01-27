const { createCanvas, loadImage, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');
const sizeOf = require('image-size');
const path = require('path');

const functions = require("../functions");

const result_bo3 = async (interaction) => {
    // registering montserrat font
    registerFont(path.resolve(__dirname, '../fonts/Montserrat-Bold.ttf'), { family: 'Montserrat' });

    // creating canvas
    await interaction.reply(`_Preparing the design... <a:Loading:996805501180448799>_`);
    const canvas = createCanvas(3840, 2160);
    const context = canvas.getContext('2d');

    // loading the background and other images
    const background = await loadImage(path.resolve(__dirname, '../images/map_pictures') + '/' + interaction.options.get('map-1').value + '.jpg');
    const winner_logo = functions.resizeImage(await loadImage(interaction.options.get('winner-logo').attachment.url), 1523);
    const loser_logo = functions.resizeImage(await loadImage(interaction.options.get('loser-logo').attachment.url), 1523);
    const tournament_logo_src = path.resolve(__dirname, '../images/tournament_logos') + '/' + interaction.options.get('tournament-logo').value + '.png';
    const tournament_logo = await loadImage(tournament_logo_src);
    const rectangles = await loadImage(path.resolve(__dirname, '../images/results-rectangles.png'));
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
    let map3 = interaction.options.getString('map-3') ?? ' ';
    if (map3 !== ' ')
        map3 = map3.toUpperCase();
    const loser1_rounds = interaction.options.get('loser-1-rounds').value;
    const loser2_rounds = interaction.options.get('loser-2-rounds').value;
    const loser3_rounds = interaction.options.getString('loser-3-rounds') ?? ' ';
    const map1_winner = interaction.options.get('map-1-winner').value;
    const map2_winner = interaction.options.get('map-2-winner').value;
    const winner_name = interaction.options.get('winner-name').value;
    const loser_name = interaction.options.get('loser-name').value;

    // setting text style & placing texts on the design
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = "middle";
    // match score
    context.font = '160px Montserrat';
    context.fillText('2', 1109, 1700.5);
    if (map3 === ' ')
        context.fillText('0', canvas.width - 1109, 1700.5);
    else
        context.fillText('1', canvas.width - 1109, 1700.5);
    // tournament information
    context.font = functions.applyText(canvas, tournament_name, 30, 800);
    context.fillText(tournament_name, canvas.width / 2, canvas.height / 2 - 40);
    context.font = functions.applyText(canvas, tournament_round, 100, 800);
    context.fillText(tournament_round, canvas.width / 2, canvas.height / 2 + 30);
    let map1_string, map2_string, map3_string;
    // team names
    context.font = functions.applyText(canvas, winner_name, 80, 650);
    context.fillText(winner_name, 1109, 1480);
    context.font = functions.applyText(canvas, loser_name, 80, 650);
    context.fillText(loser_name, canvas.width - 1109, 1480);
    // map 1
    if (map1_winner === 'first')
        map1_string = '13 ' + map1 + ' ' + loser1_rounds;
    else
        map1_string = loser1_rounds + ' ' + map1 + ' 13';
    context.font = functions.applyText(canvas, map1_string, 40, 800);
    context.fillText(map1_string, canvas.width / 2, canvas.height / 2 + 150);
    // map 2
    if (map2_winner === 'first')
        map2_string = '13 ' + map2 + ' ' + loser2_rounds;
    else
        map2_string = loser2_rounds + ' ' + map2 + ' 13';
    context.font = functions.applyText(canvas, map2_string, 40, 800);
    context.fillText(map2_string, canvas.width / 2, canvas.height / 2 + 200);
    // map 3 (optional)
    if (map3 !== ' ') {
        map3_string = '13 ' + map3 + ' ' + loser3_rounds;
        context.font = functions.applyText(canvas, map3_string, 40, 800);
        context.fillText(map3_string, canvas.width / 2, canvas.height / 2 + 250);
    }

    // send the design back to the user
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'tournament.png' });
    await interaction.editReply({ content: null, files: [attachment] });
}

module.exports = result_bo3;