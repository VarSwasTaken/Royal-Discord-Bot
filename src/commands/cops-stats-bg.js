const { createCanvas, loadImage, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');
const path = require('path');

const { resizeImage } = require("../functions");

const cops_stats_bg = async (interaction) => {
    // registering fonts
    registerFont(path.resolve(__dirname, '../fonts/Carmen Sans Bold.otf'), { family: 'Carmen Sans Bold' });
    registerFont(path.resolve(__dirname, '../fonts/Carmen Sans Medium.otf'), { family: 'Carmen Sans Medium' });
    registerFont(path.resolve(__dirname, '../fonts/BebasNeue Bold.ttf'), { family: 'Bebas Neue Bold' });
    registerFont(path.resolve(__dirname, '../fonts/BebasNeuePro-BoldItalic.otf'), { family: 'Bebas Neue Bold', style: 'italic' });
    registerFont(path.resolve(__dirname, '../fonts/Montserrat-Bold.ttf'), { family: 'Montserrat Bold' });
    registerFont(path.resolve(__dirname, '../fonts/Montserrat-ExtraBoldItalic.ttf'), { family: 'Montserrat ExtraBold', style: 'italic' });
    
    // creating canvas
    await interaction.deferReply();
    const canvas = createCanvas(4403, 2477);
    const context = canvas.getContext('2d');

    // loading the background and other images
    const background = await loadImage(path.resolve(__dirname, '../images/backgrounds/cops-stats-bg.jpg'));
    const tournament_logo = resizeImage(await loadImage(interaction.options.get('tournament-logo').attachment.url), 194, 194);
    const winner_logo = resizeImage(await loadImage(interaction.options.get('winner-logo').attachment.url), 215, 215);
    const loser_logo = resizeImage(await loadImage(interaction.options.get('loser-logo').attachment.url), 215, 215);

    // // cutting and placing images on the design
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.drawImage(tournament_logo, 1437 + 227/2, 270 - 97);
    context.drawImage(winner_logo, 281 - 215/2, 449 - 215/2);
    context.drawImage(loser_logo, 4121 - 215/2, 449 - 215/2);

    // // loading text values
    const tournament_name = interaction.options.get('tournament-name').value;
    const tournament_round = interaction.options.get('tournament-round').value;
    const winner_name = interaction.options.get('winner-name').value;
    let winner_tag = interaction.options.get('winner-tag').value;
    const loser_name = interaction.options.get('loser-name').value;
    let loser_tag = interaction.options.get('loser-tag').value;
    let winner_score = 0;
    let loser_score = 0;

    if(winner_tag[0] != '[') winner_tag = '[' + winner_tag + ']';
    if(loser_tag[0] != '[') loser_tag = '[' + loser_tag + ']';

    const maps = [{}]

    for(let i=1; i<6; i++) {
        if(interaction.options.get(`map-${i}`) != null) {
            let map = resizeImage(await loadImage(path.resolve(__dirname, `../images/maps/${interaction.options.get(`map-${i}`).value}.jpg`)), 322, 211);
            let map_rounds = interaction.options.get(`map-${i}-loser-rounds`).value;
            let map_winner = interaction.options.get(`map-${i}-winner`).value;
            if(map_winner === 'first-team') {
                map_winner = winner_name;
                winner_score++;
            }
            else {
                map_winner = loser_name;
                loser_score++;
            }
            maps[i-1] = {name: map, loser_rounds: map_rounds, winner: map_winner};
        }
        else break;
    }

    context.fillStyle = '#ffffff';
    context.textBaseline = "middle";
    
    context.textAlign = 'center';
    context.font = '140px Carmen Sans Bold';
    context.fillText(winner_score, 1438, 679);
    context.fillText(loser_score, 2968, 679);

    context.textAlign = 'left';
    context.font = '70px Carmen Sans Bold';
    context.fillText(winner_name, 281 - 215/2, 650);
    context.font = '60px Carmen Sans Medium';
    context.fillText(winner_tag, 281 - 215/2, 750);

    context.textAlign = 'right';
    context.font = '65px Carmen Sans Bold';
    context.fillText(tournament_name, 2963 - 227/2, 236);
    context.font = '65px Carmen Sans Medium';
    context.fillText(tournament_round, 2963 - 227/2, 314);
    context.font = '70px Carmen Sans Bold';
    context.fillText(loser_name, 4121 + 215/2, 650);
    context.font = '60px Carmen Sans Medium';
    context.fillText(loser_tag, 4121 + 215/2, 750);

    switch(maps.length) {
        case 1:
            context.drawImage(maps[0].name, 2397 - 322/2, 1989 - 208/2);
            context.font = 'italic 90px Bebas Neue Bold';
            context.fillText(`13-${maps[0].loser_rounds}`, 2367 - 322/2, 1950);
            context.font = 'italic 70px Bebas Neue Bold';
            context.fillText(`FOR ${maps[0].winner.toUpperCase()}`, 2367 - 322/2, 2040);
        break;

        case 2:
            context.drawImage(maps[0].name, 1631 - 322/2, 1989 - 208/2);
            context.drawImage(maps[1].name, 3044 - 322/2, 1989 - 208/2);
            context.font = 'italic 90px Bebas Neue Bold';
            context.fillText(`13-${maps[0].loser_rounds}`, 1601 - 322/2, 1950);
            context.fillText(`13-${maps[1].loser_rounds}`, 3014 - 322/2, 1950);
            context.font = 'italic 70px Bebas Neue Bold';
            context.fillText(`FOR ${maps[0].winner.toUpperCase()}`, 1601 - 322/2, 2040);
            context.fillText(`FOR ${maps[1].winner.toUpperCase()}`, 3014 - 322/2, 2040);
        break;

        case 3:
            context.drawImage(maps[0].name, 1390 - 322/2, 1989 - 208/2);
            context.drawImage(maps[1].name, 2397 - 322/2, 1989 - 208/2);
            context.drawImage(maps[2].name, 3402 - 322/2, 1989 - 208/2);
            context.font = 'italic 90px Bebas Neue Bold';
            context.fillText(`13-${maps[0].loser_rounds}`, 1360 - 322/2, 1950);
            context.fillText(`13-${maps[1].loser_rounds}`, 2367 - 322/2, 1950);
            context.fillText(`13-${maps[2].loser_rounds}`, 3372 - 322/2, 1950);
            context.font = 'italic 70px Bebas Neue Bold';
            context.fillText(`FOR ${maps[0].winner.toUpperCase()}`, 1360 - 322/2, 2040);
            context.fillText(`FOR ${maps[1].winner.toUpperCase()}`, 2367 - 322/2, 2040);
            context.fillText(`FOR ${maps[2].winner.toUpperCase()}`, 3372 - 322/2, 2040);
        break;

        case 4:
            context.drawImage(maps[0].name, 1142 - 322/2, 1989 - 208/2);
            context.drawImage(maps[1].name, 1976 - 322/2, 1989 - 208/2);
            context.drawImage(maps[2].name, 2813 - 322/2, 1989 - 208/2);
            context.drawImage(maps[3].name, 3652 - 322/2, 1989 - 208/2);
            context.font = 'italic 90px Bebas Neue Bold';
            context.fillText(`13-${maps[0].loser_rounds}`, 1112 - 322/2, 1950);
            context.fillText(`13-${maps[1].loser_rounds}`, 1946 - 322/2, 1950);
            context.fillText(`13-${maps[2].loser_rounds}`, 2783 - 322/2, 1950);
            context.fillText(`13-${maps[3].loser_rounds}`, 3622 - 322/2, 1950);
            context.font = 'italic 70px Bebas Neue Bold';
            context.fillText(`FOR ${maps[0].winner.toUpperCase()}`, 1112 - 322/2, 2040);
            context.fillText(`FOR ${maps[1].winner.toUpperCase()}`, 1946 - 322/2, 2040);
            context.fillText(`FOR ${maps[2].winner.toUpperCase()}`, 2783 - 322/2, 2040);
            context.fillText(`FOR ${maps[3].winner.toUpperCase()}`, 3622 - 322/2, 2040);
        break;

        case 5:
            context.drawImage(maps[0].name, 726 - 322/2, 1989 - 208/2);
            context.drawImage(maps[1].name, 1560 - 322/2, 1989 - 208/2);
            context.drawImage(maps[2].name, 2397 - 322/2, 1989 - 208/2);
            context.drawImage(maps[3].name, 3236 - 322/2, 1989 - 208/2);
            context.drawImage(maps[4].name, 4068 - 322/2, 1989 - 208/2);
            context.font = 'italic 90px Bebas Neue Bold';
            context.fillText(`13-${maps[0].loser_rounds}`, 696 - 322/2, 1950);
            context.fillText(`13-${maps[1].loser_rounds}`, 1530 - 322/2, 1950);
            context.fillText(`13-${maps[2].loser_rounds}`, 2367 - 322/2, 1950);
            context.fillText(`13-${maps[3].loser_rounds}`, 3206 - 322/2, 1950);
            context.fillText(`13-${maps[4].loser_rounds}`, 4038 - 322/2, 1950);
            context.font = 'italic 70px Bebas Neue Bold';
            context.fillText(`FOR ${maps[0].winner.toUpperCase()}`, 696 - 322/2, 2040);
            context.fillText(`FOR ${maps[1].winner.toUpperCase()}`, 1530 - 322/2, 2040);
            context.fillText(`FOR ${maps[2].winner.toUpperCase()}`, 2367 - 322/2, 2040);
            context.fillText(`FOR ${maps[3].winner.toUpperCase()}`, 3206 - 322/2, 2040);
            context.fillText(`FOR ${maps[4].winner.toUpperCase()}`, 4038 - 322/2, 2040);
        break;
    }

    // sending the design back to the user
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'tournament.png' });
    await interaction.editReply({ content: null, files: [attachment] });
}

module.exports = cops_stats_bg;