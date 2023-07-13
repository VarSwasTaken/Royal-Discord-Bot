require('dotenv').config();

const { cops_maps, map_winner } = require('./variables')

const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits, Application } = require('discord.js');

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
        name: 'cops-result-bo1',
        description: 'Get the image for result of a Best of 1 Critical Ops match.',
        options: [
            {
                name: 'winner-name',
                description: 'Name of the winning team',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'winner-logo',
                description: 'Logo of the winning team',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'loser-name',
                description: 'Name of the losing team',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'loser-logo',
                description: 'Logo of the losing team',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'loser-rounds',
                description: 'Amount of rounds won by the losing team',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'map',
                description: 'Map on which the game was played',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: cops_maps
            },
            {
                name: 'tournament-logo',
                description: 'Tournament logo',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Celtic Wizard Tournament',
                        value: 'celtic'
                    },
                    {
                        name: 'Critical Ops Circuit',
                        value: 'circuit'
                    },
                    {
                        name: 'DoMination Tournament',
                        value: 'domination'
                    },
                    {
                        name: 'HypheN Cup Series',
                        value: 'hyphen'
                    },
                    {
                        name: 'ISF Tournament',
                        value: 'isf'
                    },
                    {
                        name: 'Polaris Tournament',
                        value: 'polaris'
                    },
                    {
                        name: 'SnapDragon Tournament',
                        value: 'snapdragon'
                    }
                ]
            },
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
        ]
    },
    {
        name: 'cops-result-bo2',
        description: 'Get the image for the result of a Best of 2 Critical Ops match.',
        options: [
            {
                name: 'first-team-name',
                description: 'Name of the first team',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'first-team-logo',
                description: 'Logo of the first team',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'second-team-name',
                description: 'Name of the second team',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'second-team-logo',
                description: 'Logo of the second team',
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
                choices: [
                    {
                        name: 'First team',
                        value: 'first'
                    },
                    {
                        name: 'Second team',
                        value: 'second'
                    }
                ]
            },
            {
                name: 'loser-1-rounds',
                description: 'Amount of rounds won by the losing team (map 1)',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'map-2',
                description: 'Second map of the match',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: cops_maps
            },
            {
                name: 'map-2-winner',
                description: 'Team which won the second map',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'First team',
                        value: 'first'
                    },
                    {
                        name: 'Second team',
                        value: 'second'
                    }
                ]
            },
            {
                name: 'loser-2-rounds',
                description: 'Amount of rounds won by the losing team (map 2)',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tournament-logo',
                description: 'Tournament logo',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Celtic Wizard Tournament',
                        value: 'celtic'
                    },
                    {
                        name: 'Critical Ops Circuit',
                        value: 'circuit'
                    },
                    {
                        name: 'DoMination Tournament',
                        value: 'domination'
                    },
                    {
                        name: 'HypheN Cup Series',
                        value: 'hyphen'
                    },
                    {
                        name: 'ISF Tournament',
                        value: 'isf'
                    },
                    {
                        name: 'Polaris Tournament',
                        value: 'polaris'
                    },
                    {
                        name: 'SnapDragon Tournament',
                        value: 'snapdragon'
                    }
                ]
            },
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
        ]
    },
    {
        name: 'cops-result-bo3',
        description: 'Get the image for the result of a Best of 3 Critical Ops match.',
        options: [
            {
                name: 'winner-name',
                description: 'Name of the winning team',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'winner-logo',
                description: 'Logo of the winning team',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'loser-name',
                description: 'Name of the losing team',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'loser-logo',
                description: 'Logo of the losing team',
                type: ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: 'map-1',
                description: 'First map of the match.',
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
                name: 'loser-1-rounds',
                description: 'Amount of rounds won by the losing team (map 1)',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'map-2',
                description: 'Second map of the match.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: cops_maps
            },
            {
                name: 'map-2-winner',
                description: 'Team which won the second map',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: map_winner
            },
            {
                name: 'loser-2-rounds',
                description: 'Amount of rounds won by the losing team (map 2)',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tournament-logo',
                description: 'Tournament logo',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Celtic Wizard Tournament',
                        value: 'celtic'
                    },
                    {
                        name: 'Critical Ops Circuit',
                        value: 'circuit'
                    },
                    {
                        name: 'DoMination Tournament',
                        value: 'domination'
                    },
                    {
                        name: 'HypheN Cup Series',
                        value: 'hyphen'
                    },
                    {
                        name: 'ISF Tournament',
                        value: 'isf'
                    },
                    {
                        name: 'Polaris Tournament',
                        value: 'polaris'
                    },
                    {
                        name: 'SnapDragon Tournament',
                        value: 'snapdragon'
                    }
                ]
            },
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
                name: 'map-3',
                description: 'Third map of the match',
                type: ApplicationCommandOptionType.String,
                choices: cops_maps
            },
            {
                name: 'loser-3-rounds',
                description: 'Amount of rounds won by the losing team (map 3)',
                type: ApplicationCommandOptionType.String
            }
        ]
    },
    {
        name: 'cops-stats-bg',
        description: 'Produce the background for stats of Critical Ops match.',
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