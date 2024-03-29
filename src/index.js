require('dotenv').config();

const commands = require("./commands");

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [ 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMessageTyping, 
        GatewayIntentBits.MessageContent,
    ],
    restRequestTimeout: 600000
});

client.cooldowns = new Collection();
client.COOLDOWN_SECONDS = 60 * 60 * 24 * 3;


client.on('ready', () => {
    console.log(`${client.user.tag} is now online.`);
})

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand) return;
    
    switch(interaction.commandName) {
        case 'help':
            commands.help(interaction);
        break;
        case 'stats':
            commands.stats.stats(interaction);
        break;
        case 'match-stats':
            commands.stats.match_stats(interaction);
        break;
        case 'tournament':
            commands.tournament(interaction);
        break;
        case 'cops-result-design':
            commands.cops_result_design(interaction);
        break;
        case 'cops-stats-bg':
            commands.cops_stats_design.stats_bg(interaction);
        break;
        case 'cops-stats-fill-1':
            commands.cops_stats_design.stats_fill_1(interaction);
        break;
        case 'cops-stats-fill-2':
            commands.cops_stats_design.stats_fill_2(interaction);
        break;
        case 'content':
            commands.content(interaction, client);
        break;
    }
})

client.login(process.env.BOT_TOKEN);
