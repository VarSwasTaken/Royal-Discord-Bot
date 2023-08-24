require('dotenv').config();

const { cops_maps, map_winner } = require('./variables')

const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits, Application, ApplicationCommand } = require('discord.js');

const commands = [
    {
        name: 'help',
        description: 'Get a list of commands and their details.'
    },
    {
        name: 'content',
        description: 'Post a YouTube video in the #media channel.',
        options: [
            {
                name: 'link',
                description: 'URL link to the YouTube video.',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'stats',
        description: 'Calculate the Rating, K/D Ratio and Impact of a player.',
        options: [
            {
                name: 'nickname',
                description: `The player's nickname.`,
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'rounds',
                description: 'The total amount of rounds played.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'kills',
                description: 'The total amount of players killed.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'deaths',
                description: 'The total amount of deaths suffered.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'assists',
                description: 'The total amount of assists made.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name: 'match-stats',
        description: 'Calculate the Rating, K/D Ratio and Impact of 5 players.',
        options: [
            {
                name: 'nickname-1',
                description: `The player's nickname.`,
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'rounds-1',
                description: 'The total amount of rounds played.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'kills-1',
                description: 'The total amount of players killed.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'deaths-1',
                description: 'The total amount of deaths suffered.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'assists-1',
                description: 'The total amount of assists made.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'nickname-2',
                description: `The player's nickname.`,
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'rounds-2',
                description: 'The total amount of rounds played.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'kills-2',
                description: 'The total amount of players killed.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'deaths-2',
                description: 'The total amount of deaths suffered.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'assists-2',
                description: 'The total amount of assists made.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'nickname-3',
                description: `The player's nickname.`,
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'rounds-3',
                description: 'The total amount of rounds played.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'kills-3',
                description: 'The total amount of players killed.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'deaths-3',
                description: 'The total amount of deaths suffered.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'assists-3',
                description: 'The total amount of assists made.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'nickname-4',
                description: `The player's nickname.`,
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'rounds-4',
                description: 'The total amount of rounds played.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'kills-4',
                description: 'The total amount of players killed.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'deaths-4',
                description: 'The total amount of deaths suffered.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'assists-4',
                description: 'The total amount of assists made.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'nickname-5',
                description: `The player's nickname.`,
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'rounds-5',
                description: 'The total amount of rounds played.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'kills-5',
                description: 'The total amount of players killed.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'deaths-5',
                description: 'The total amount of deaths suffered.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'assists-5',
                description: 'The total amount of assists made.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name: 'tournament',
        description: 'Get the heading image of a tournament.',
        options: [
            {
                name: 'name',
                description: 'Tournament name',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
    {
        name: 'cops-result-design',
        description: 'Produce the design for result of a Critical Ops match.',
        options: [
            {
                name: 'tournament-name',
                description: 'Name of the tournament',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tournament-round',
                description: 'Round of the tournament',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tournament-logo',
                description: 'Logo of the tournament',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'winner-name',
                description: 'Name of the winner of the match',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'winner-logo',
                description: 'Logo of the winner of the match',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'loser-name',
                description: 'Name of the loser of the match',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'loser-logo',
                description: 'Logo of the loser of the match',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'map-1',
                description: 'First map of the match',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: cops_maps
            },
            {
                name: 'map-1-winner',
                description: 'Team which won the first map',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: map_winner
            },
            {
                name: 'map-1-loser-rounds',
                description: 'Number of rounds won by first map loser',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'map-2',
                description: 'Second map of the match',
                type: ApplicationCommandOptionType.String,
                choices: cops_maps
            },
            {
                name: 'map-2-winner',
                description: 'Team which won the second map',
                type: ApplicationCommandOptionType.String,
                choices: map_winner
            },
            {
                name: 'map-2-loser-rounds',
                description: 'Number of rounds won by second map loser',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'map-3',
                description: 'Third map of the match',
                type: ApplicationCommandOptionType.String,
                choices: cops_maps
            },
            {
                name: 'map-3-winner',
                description: 'Team which won the third map',
                type: ApplicationCommandOptionType.String,
                choices: map_winner
            },
            {
                name: 'map-3-loser-rounds',
                description: 'Number of rounds won by third map loser',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'map-4',
                description: 'Fourth map of the match',
                type: ApplicationCommandOptionType.String,
                choices: cops_maps
            },
            {
                name: 'map-4-winner',
                description: 'Team which won the fourth map',
                type: ApplicationCommandOptionType.String,
                choices: map_winner
            },
            {
                name: 'map-4-loser-rounds',
                description: 'Number of rounds won by fourth map loser',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'map-5',
                description: 'Fifth map of the match',
                type: ApplicationCommandOptionType.String,
                choices: cops_maps
            },
            {
                name: 'map-5-winner',
                description: 'Team which won the fifth map',
                type: ApplicationCommandOptionType.String,
                choices: map_winner
            },
            {
                name: 'map-5-loser-rounds',
                description: 'Number of rounds won by fifth map loser',
                type: ApplicationCommandOptionType.String,
            },
        ]
    },
    {
        name: 'cops-stats-bg',
        description: 'Produce background for a Critical Ops match stats design.',
        options: [
            {
                name: 'tournament-name',
                description: 'Full name of the tournament',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tournament-round',
                description: 'Round of the tournament',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tournament-logo',
                description: 'Logo of the tournament',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'winner-name',
                description: 'Name of the winner of the match',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'winner-tag',
                description: 'Clan tag of the winner of the match',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'winner-logo',
                description: 'Logo of the winner of the match',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'loser-name',
                description: 'Name of the loser of the match',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'loser-tag',
                description: 'Clan tag of the loser of the match',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'loser-logo',
                description: 'Logo of the loser of the match',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'mvp',
                description: 'Nickname of the Most Valuable Player',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'map-1',
                description: 'First map of the match',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: cops_maps
            },
            {
                name: 'map-1-winner',
                description: 'Team which won the first map',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: map_winner
            },
            {
                name: 'map-1-loser-rounds',
                description: 'Number of rounds won by first map loser',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'map-2',
                description: 'Second map of the match',
                type: ApplicationCommandOptionType.String,
                choices: cops_maps
            },
            {
                name: 'map-2-winner',
                description: 'Team which won the second map',
                type: ApplicationCommandOptionType.String,
                choices: map_winner
            },
            {
                name: 'map-2-loser-rounds',
                description: 'Number of rounds won by second map loser',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'map-3',
                description: 'Third map of the match',
                type: ApplicationCommandOptionType.String,
                choices: cops_maps
            },
            {
                name: 'map-3-winner',
                description: 'Team which won the third map',
                type: ApplicationCommandOptionType.String,
                choices: map_winner
            },
            {
                name: 'map-3-loser-rounds',
                description: 'Number of rounds won by third map loser',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'map-4',
                description: 'Fourth map of the match',
                type: ApplicationCommandOptionType.String,
                choices: cops_maps
            },
            {
                name: 'map-4-winner',
                description: 'Team which won the fourth map',
                type: ApplicationCommandOptionType.String,
                choices: map_winner
            },
            {
                name: 'map-4-loser-rounds',
                description: 'Number of rounds won by fourth map loser',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'map-5',
                description: 'Fifth map of the match',
                type: ApplicationCommandOptionType.String,
                choices: cops_maps
            },
            {
                name: 'map-5-winner',
                description: 'Team which won the fifth map',
                type: ApplicationCommandOptionType.String,
                choices: map_winner
            },
            {
                name: 'map-5-loser-rounds',
                description: 'Number of rounds won by fifth map loser',
                type: ApplicationCommandOptionType.String
            },
        ]
    },
    {
        name: 'cops-stats-fill-1',
        description: `Fill stats background with team 1 players' stats.`,
        options: [
            {
                name: 'background',
                description: 'Background produced by /cops-stats-bg command',
                type: ApplicationCommandOptionType.Attachment,
                required: true
            },
            {
                name: 'player-1-name',
                description: 'Name of the first player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-1-stats',
                description: 'Stats of the first player (Maps Kills Deaths Assists Rating [ex. 2 20 27 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-2-name',
                description: 'Name of the second player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-2-stats',
                description: 'Stats of the second player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-3-name',
                description: 'Name of the third player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-3-stats',
                description: 'Stats of the third player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-4-name',
                description: 'Name of the fourth player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-4-stats',
                description: 'Stats of the fourth player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-5-name',
                description: 'Name of the fifth player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-5-stats',
                description: 'Stats of the fifth player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-6-name',
                description: 'Name of the sixth player',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-6-stats',
                description: 'Stats of the sixth player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-7-name',
                description: 'Name of the seventh player',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-7-stats',
                description: 'Stats of the seventh player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-8-name',
                description: 'Name of the eigthth player',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-8-stats',
                description: 'Stats of the eigthth player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
            }
        ]
    },
    {
        name: 'cops-stats-fill-2',
        description: `Fill stats background with team 2 players' stats.`,
        options: [
            {
                name: 'background',
                description: 'Background produced by /cops-stats-fill-2 command',
                type: ApplicationCommandOptionType.Attachment,
                required: true
            },
            {
                name: 'player-1-name',
                description: 'Name of the first player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-1-stats',
                description: 'Stats of the first player (Maps Kills Deaths Assists Rating [ex. 2 20 27 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-2-name',
                description: 'Name of the second player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-2-stats',
                description: 'Stats of the second player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-3-name',
                description: 'Name of the third player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-3-stats',
                description: 'Stats of the third player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-4-name',
                description: 'Name of the fourth player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-4-stats',
                description: 'Stats of the fourth player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-5-name',
                description: 'Name of the fifth player',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-5-stats',
                description: 'Stats of the fifth player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'player-6-name',
                description: 'Name of the sixth player',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-6-stats',
                description: 'Stats of the sixth player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-7-name',
                description: 'Name of the seventh player',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-7-stats',
                description: 'Stats of the seventh player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-8-name',
                description: 'Name of the eigthth player',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'player-8-stats',
                description: 'Stats of the eigthth player (Maps Kills Deaths Assists Rating [ex. 2 20 17 3 1.12])',
                type: ApplicationCommandOptionType.String,
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        )
        console.log('Slash commands registered.');
    } catch (error) {
        console.log(error);
    }
})();