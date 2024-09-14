const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const assert = require('assert')
require('dotenv').config()
const OpenAI = require('openai');


module.exports = {
    register_command: new SlashCommandBuilder()
        .setName('recommend-gpt').setDescription('Displays recommendations available to you !')
        
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

        interaction.reply({content:`Bolando uma resposta...`,ephemeral :true});

		const category = interaction.options.getString('category') ?? 'No category provided';
        
        assert(process.env.OPEN_AI_KEY, "A OpenAI Token for your bot is required!")
        console.log('process.env.OPEN_AI_KEY - ' + process.env.OPEN_AI_KEY)
        const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })

        const userInput = "Olá, me de uma lista de jogos recomendados na categoria " + category + ", informando onde posso jogar e onde posso comprar";

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
        });
        
        console.log(completion.choices[0]);

        // await wait(2_000);
        // await interaction.editReply({content:`Iaew World! 2`,ephemeral :true});
        // await interaction.followUp({ content: 'Pong again!', ephemeral: true });
        

        
        return interaction.editReply({content:category,ephemeral :true});
    }
}