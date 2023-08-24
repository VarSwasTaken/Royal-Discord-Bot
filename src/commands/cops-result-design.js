const { createCanvas, loadImage, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');
const path = require('path');

const { applyText, resizeImage } = require("../functions");

const cops_result_design = async (interaction) => {
    // registering montserrat font
    registerFont(path.resolve(__dirname, '../fonts/Montserrat-Bold.ttf'), { family: 'Montserrat' });
    
    // creating canvas
    await interaction.deferReply();
    const canvas = createCanvas(3840, 2160);
    const context = canvas.getContext('2d');

    // loading background and result rectangles
    let background, rectangles;
    let maps = [];
    let winner_score = 0;
    let loser_score = 0;

    for(let i=1; i<6; i++) {
        if(interaction.options.get(`map-${i}`) != null) {
            let map_name = interaction.options.get(`map-${i}`).value.toUpperCase();
            let loser_rounds = interaction.options.get(`map-${i}-loser-rounds`).value;
            let map_winner = interaction.options.get(`map-${i}-winner`).value;
            if(map_winner === 'first-team') {
                maps[i-1] = `13 ${map_name} ${loser_rounds}`;
                winner_score++;
            }
            else {
                maps[i-1] = `${loser_rounds} ${map_name} 13`;
                loser_score++;
            }
        }
        else break;
    }

    // check if draw
    if(winner_score === loser_score) {
        background = await loadImage(path.resolve(__dirname, '../images/map_pictures') + '/' + interaction.options.get('map-1').value + '2.jpg');
        rectangles = await loadImage(path.resolve(__dirname, '../images/backgrounds/results-rectangles2.png'));
    }
    else {
        background = await loadImage(path.resolve(__dirname, '../images/map_pictures') + '/' + interaction.options.get('map-1').value + '.jpg');
        rectangles = await loadImage(path.resolve(__dirname, '../images/backgrounds/results-rectangles.png'));
    }
    
    // loading images
    const winner_logo = resizeImage(await loadImage(interaction.options.get('winner-logo').attachment.url), 1523, 1523);
    const loser_logo = resizeImage(await loadImage(interaction.options.get('loser-logo').attachment.url), 1523, 1523);
    const tournament_logo = resizeImage(await loadImage(interaction.options.get('tournament-logo').attachment.url), 300, 300);
    const black_rectangles = await loadImage(path.resolve(__dirname, '../images/backgrounds/results-rectanglesblack.png'));
    
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    let sx = (1523-743) / 2;
    let sy = 0;
    let sw = 743;
    let sh = 1523;
    let dw = 743;
    let dh = 1523;
    context.drawImage(winner_logo, sx, sy, sw, sh, 1109 - (743/2), 996.5 - (1523/2), dw, dh);
    context.drawImage(loser_logo, sx, sy, sw, sh, 2730.5 - (742/2), 996.5 - (1523/2), dw, dh);
    context.drawImage(tournament_logo, canvas.width / 2 - 300 / 2, canvas.height / 2 - 420);
    context.drawImage(black_rectangles, 0, 0, canvas.width, canvas.height);
    context.drawImage(rectangles, 0, 0, canvas.width, canvas.height);

    // loading text values
    const tournament_name = interaction.options.get('tournament-name').value;
    const tournament_round = interaction.options.get('tournament-round').value.toUpperCase();
    const winner_name = interaction.options.get('winner-name').value;
    const loser_name = interaction.options.get('loser-name').value;

    // setting text style & placing texts on the design
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = "middle";
    // match score
    context.font = '160px Montserrat';
    context.fillText(winner_score, 1109, 1700.5);
    context.fillText(loser_score, canvas.width - 1109, 1700.5);
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
    // maps
    for(let i=0; i<maps.length; i++) {
        context.font = applyText(canvas, maps[i], 40, 800);
        context.fillText(maps[i], canvas.width / 2, canvas.height / 2 + 150 + 50*i);
    }

    // sending the design back to the user
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'tournament.png' });
    await interaction.editReply({ content: null, files: [attachment] });
}

module.exports = cops_result_design;