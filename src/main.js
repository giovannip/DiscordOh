require('dotenv').config()
const Discord = require('discord.js')
const assert = require('assert')
const find_events = require('./utils/initialisation/find_events')
const find_commands = require('./utils/initialisation/find_commands')
const register_commands = require('./utils/initialisation/register_commands')
const express = require('express')  // Adicionando o Express
const path = require('path')

const { DiscordTogether } = require('discord-together');

assert(process.env.TOKEN, "A Discord Token for your bot is required ! Please go to your application page to get it! Set your token then as an environmental variable with the TOKEN variable name!")
console.log('process.env.TOKEN - ' + process.env.TOKEN)

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Discord.Partials.Message,
        Discord.Partials.Channel,
        Discord.Partials.Reaction
    ]
});

client.discordTogether = new DiscordTogether(client);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'start-activity') {
        const channel = interaction.member.voice.channel;
        if (!channel) {
            return interaction.reply('Você precisa estar em um canal de voz para iniciar uma atividade.');
        }

        client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
            return interaction.reply(`Clique neste link para participar da atividade: ${invite.code}`);
        });
    }
});

client.on('ready', () =>{
    console.log('FINALLYYYYYY')
    console.log('https://discord.com/api/oauth2/authorize?client_id=' + process.env.CLIENT_ID + '&permissions=0&scope=bot%20applications.commands')
})

find_events(client)

const commands = find_commands(client)

client.login(process.env.TOKEN)

client.once(Discord.Events.ClientReady, (client) => {
    register_commands(client, commands)
})

// Configurando o servidor express
const app = express()

// Define o diretório público para servir os arquivos HTML, CSS e JS
app.use(express.static(path.join(__dirname, 'public')))

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Inicia o servidor na porta 3000 ou a que estiver no ambiente
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
