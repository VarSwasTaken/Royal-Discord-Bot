const match_stats = (interaction) => {
    let message = ``;
    let players = [];

    // setting information for every player
    for(let i=0; i<5; i++) {
        // collecting data from the user
        players[i] = {};
        let num = i+1;
        players[i].nickname = interaction.options.get('nickname-' + num).value;
        players[i].rounds = interaction.options.get('rounds-' + num).value;
        players[i].kills = interaction.options.get('kills-' + num).value;
        players[i].deaths = interaction.options.get('deaths-' + num).value;
        players[i].assists = interaction.options.get('assists-' + num).value;

        // calculating different values & adding KD Ratio, Impact and Rating to the players' information
        players[i].kdRatio = (Math.round((players[i].kills / players[i].deaths) * 100) / 100).toFixed(2);
        if(players[i].deaths === 0)
            players[i].kdRatio = players[i].kills.toFixed(2);
        let killRating = ((players[i].kills + 0.25 * players[i].assists) / players[i].rounds) / 0.679;
        let survivalRate = ((players[i].rounds - players[i].deaths) / players[i].rounds) / 0.317;
        players[i].rating = (Math.round(((killRating + survivalRate * 0.6) / 1.6) * 100) / 100).toFixed(2);
        players[i].impact = (Math.round((2.13 * (players[i].kills / players[i].rounds) + 0.42 * (players[i].assists / players[i].rounds) - 0.41) * 100) / 100).toFixed(2);
    }

    // sorting the players by Rating > KD Ratio > Impact > Kills > Deaths > Assists
    players.sort((a, b) => {
        if(a.rating > b.rating)
            return -1;
        if(a.rating === b.rating) {
            if(a.kdRatio > b.kdRatio)
                return -1;
            if(a.kdRatio === b.kdRatio) {
                if(a.impact > b.impact)
                    return -1;
                if(a.impact === b.impact) {
                    if(a.kills > b.kills)
                        return -1;
                    if(a.kills === b.kills) {
                        if(a.deaths < b.deaths)
                            return -1;
                        if(a.deaths === b.deaths) {
                            if(a.assists > b.assists)
                                return -1;
                        }
                    }
                }
            }   
        }
        return 1;
    })

    // styling the message and sending the result to user
    for(let i=0; i<5; i++) {
        message += `**${players[i].nickname}** _${players[i].kills}K | ${players[i].deaths}D | ${players[i].assists}A | ${players[i].kdRatio}KDR | ${players[i].impact}IMP | **${players[i].rating}**_
        `
        .replace(/  +/g, '')
    }
    interaction.reply(message);
}

module.exports = match_stats;