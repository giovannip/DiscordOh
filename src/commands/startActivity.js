const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    register_command: new SlashCommandBuilder()
        .setName('start-activity')
        .setDescription('Starts a custom activity')
        .addStringOption(option => option.setName('input').setDescription('The input to echo back'))
        ,
    async execute(interaction) {
        const channel = interaction.member.voice.channel;
        if (!channel) {
            return interaction.reply('Você precisa estar em um canal de voz para iniciar uma atividade.');
        }

        try {
            await client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
                return interaction.reply(`${invite.code}`);
            });
        } catch (error) {
            console.error('Erro ao iniciar a atividade:', error);
            interaction.reply('Houve um erro ao tentar iniciar a atividade.');
        }
    }
}