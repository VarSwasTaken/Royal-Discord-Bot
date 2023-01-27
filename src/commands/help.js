const help = (interaction)  => {
    const embed = {
        color: 0x1d1d25,
        title: 'Help - Commands',
        author: {
            name: 'Royal Bot',
            icon_url: 'https://i.imgur.com/n7yQWhn.jpeg',
        },

        fields: [
            {
                name: 'Statistical commands',
                value: `**/stats -** _Get detailed statistics of a player (K/D Ratio, Impact & Rating)._
                **/match-stats -** _Get detailed statistics of 5 players (K/D Ratio, Impact & Rating)._`
                .replace(/  +/g, '')
            },
            {
                name: 'Designing commands',
                value: `**/result-bo1 -** _Produce design of result of a Best of 1 match._
                **/result-bo2 -** _Produce design of result of a Best of 2 match._
                **/result-bo3 -** _Produce design of result of a Best of 3 match._
                **/tournament -** _Produce header design with tournament name (Admin only)._`
                .replace(/  +/g, ''),
            }
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: 'Powered by Royal Network',
            icon_url: 'https://i.imgur.com/h3duEJK.png',
        },
    };

    interaction.reply({ embeds: [embed] });
}

module.exports = help;