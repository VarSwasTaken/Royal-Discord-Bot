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
            commands.stats(interaction);
        break;
        case 'match-stats':
            commands.match_stats(interaction);
        break;
        case 'tournament':
            commands.tournament(interaction);
        break;
        case 'result-bo1':
            commands.result_bo1(interaction);
        break;
        case 'result-bo2':
            commands.result_bo2(interaction);
        break;
        case 'result-bo3':
            commands.result_bo3(interaction);
        break;
        case 'content':
            commands.content(interaction, client);
        break;
    }
})

client.login(process.env.BOT_TOKEN);
