const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const assert = require('assert')
require('dotenv').config()
const igdb = require('igdb-api-node').default;

assert(process.env.YOUR_TWITCH_CLIENT_ID, "A YOUR_TWITCH_CLIENT_ID Token for your bot is required!")
assert(process.env.YOUR_TWITCH_APP_ACCESS_TOKEN, "A YOUR_TWITCH_APP_ACCESS_TOKEN Token for your bot is required!")
console.log('process.env.YOUR_TWITCH_CLIENT_ID - ' + process.env.YOUR_TWITCH_CLIENT_ID)
console.log('process.env.YOUR_TWITCH_APP_ACCESS_TOKEN - ' + process.env.YOUR_TWITCH_APP_ACCESS_TOKEN)

module.exports = {
    register_command: new SlashCommandBuilder()
        .setName('recommend').setDescription('Displays recommendations available to you !')
        
        // .addStringOption(option => option.setName('input').setDescription('The input to echo back'))
        // .addChannelOption(option => option.setName('channel').setDescription('The channel to echo into'))
        // .addBooleanOption(option => option.setName('ephemeral').setDescription('Whether or not the echo should be ephemeral'))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Escolha qual categoria de jogos a serem recomendados')
                .setRequired(true)
                .addChoices(
                    { name: 'Ação', value: 'Ação' },
                    { name: 'Aventura', value: 'Aventura' },
                    { name: 'RPG (Role-Playing Game)', value: 'RPG (Role-Playing Game)' },
                    { name: 'Estratégia', value: 'Estratégia' },
                    { name: 'Simulação', value: 'Simulação' },
                    { name: 'Esportes', value: 'Esportes' },
                    { name: 'Corrida', value: 'Corrida' },
                    { name: 'Quebra-cabeças', value: 'Quebra-cabeças' },
                    { name: 'Música/Ritmo', value: 'Música/Ritmo' },
                    { name: 'Sobrevivência', value: 'Sobrevivência' },
                    { name: 'Terror', value: 'Terror' },
                    { name: 'Mundo Aberto', value: 'Mundo Aberto' },
                    { name: 'Ficção Científica', value: 'Ficção Científica' },
                    { name: 'Fantasia', value: 'Fantasia' },
                    { name: 'História Alternativa', value: 'História Alternativa' },
                    { name: 'Multiplayer Online', value: 'Multiplayer Online' },
                    { name: 'Jogos de Cartas', value: 'Jogos de Cartas' },
                    { name: 'Jogos de Tabuleiro', value: 'Jogos de Tabuleiro' },
                    { name: 'Jogos de Luta', value: 'Jogos de Luta' },
                    { name: 'Jogos Educativos', value: 'Jogos Educativos' },
                ))

        ,
    async execute(discordClient, interaction) {

        console.log('process.env.YOUR_TWITCH_CLIENT_ID - ' + process.env.YOUR_TWITCH_CLIENT_ID)
        console.log('process.env.YOUR_TWITCH_APP_ACCESS_TOKEN - ' + process.env.YOUR_TWITCH_APP_ACCESS_TOKEN)       

        interaction.reply({content:`Bolando uma boas resposta...`, ephemeral :true});

        // Example using all methods.
        const response = await igdb(process.env.YOUR_TWITCH_CLIENT_ID, process.env.YOUR_TWITCH_APP_ACCESS_TOKEN)
            .fields(['name', 'movies', 'age']) // fetches only the name, movies, and age fields
            .fields('name,movies,age') // same as above

            .limit(50) // limit to 50 results
            .offset(10) // offset results by 10

            .sort('name') // default sort direction is 'asc' (ascending)
            .sort('name', 'desc') // sorts by name, descending
            .search('mario') // search for a specific name (search implementations can vary)

            .where(`first_release_date > ${new Date().getTime() / 1000}`) // filter the results

            .request('/games'); // execute the query and return a response object

        console.log(response.data);

        // await wait(2_000);
        // await interaction.editReply({content:`Iaew World! 2`,ephemeral :true});
        // await interaction.followUp({ content: 'Pong again!', ephemeral: true });
        

        
        return interaction.editReply({content: response.data,ephemeral :true});
    }
}