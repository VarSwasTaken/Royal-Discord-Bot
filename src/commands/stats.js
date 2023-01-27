const stats = (interaction) => {

    // collecting data from the user
    let nickname = interaction.options.get('nickname').value;
    let rounds = interaction.options.get('rounds').value;
    let kills = interaction.options.get('kills').value;
    let deaths = interaction.options.get('deaths').value;
    let assists = interaction.options.get('assists').value;

    // calculating different values & adding KD Ratio, Impact and Rating to the player's information
    let kdRatio = (Math.round((kills / deaths) * 100) / 100).toFixed(2);
    if(deaths === 0) // if deaths are equal to 0, change KDR to the same value as Kills
        kdRatio = kills.toFixed(2);
    let killRating = ((kills + 0.25 * assists) / rounds) / 0.679;
    let survivalRate = ((rounds - deaths) / rounds) / 0.317;
    let rating = (Math.round(((killRating + survivalRate * 0.6) / 1.6) * 100) / 100).toFixed(2);
    let impact = (Math.round((2.13 * (kills / rounds) + 0.42 * (assists / rounds) - 0.41) * 100) / 100).toFixed(2);

    // styling the message and sending the result to user
    interaction.reply(
        `**${nickname}** _${kills}K | ${deaths}D | ${assists}A | ${kdRatio}KDR | ${impact}IMP | **${rating}**_
        `
        .replace(/  +/g, '')
    );
}

module.exports = stats;