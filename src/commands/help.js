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
                name: 'Calculation commands',
                value: `**/stats -** _Calculate rating for a single player._
                **/match-stats -** _Calculate rating for five players at once._`
                .replace(/  +/g, '')
            },
            {
                name: 'Design commands (Critical Ops)',
                value: `**/cops-result-design -** _Produce design for a Critical Ops match result._
                **/cops-stats-bg -** _Produce background for a Critical Ops match stats design._
                **/cops-stats-fill-1 -** _Fill stats background with team 1 players' stats._
                **/cops-stats-fill-2 -** _Fill stats background with team 2 players' stats._`
                .replace(/  +/g, ''),
            },
            // {
            //     name: 'Design commands (Rainbow 6 Mobile)',
            //     value: `**/r6-result-bo1 -** _Produce design for result of a Best of 1 match (Coming soon)._
            //     **/r6-result-bo2 -** _Produce design for result of a Best of 2 match (Coming soon)_
            //     **/r6-result-bo3 -** _Produce design for result of a Best of 3 match (Coming soon)._

            //     **/r6-stats-bo1 -** _Produce design for stats of a Best of 1 match (Coming soon)._
            //     **/r6-stats-bo2 -** _Produce design for stats of a Best of 2 match (Coming soon)._
            //     **/r6-stats-bo3 -** _Produce design for stats of a Best of 3 match (Coming soon)._`
            //     .replace(/  +/g, ''),
            // }
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