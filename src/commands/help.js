const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    register_command: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays all commands available to you !')
        .addStringOption(option => option.setName('input').setDescription('The input to echo back'))
        ,
    async execute(client, interaction) {
        interaction.reply({content:`World!`,ephemeral :true})

        const xxx = interaction.options.getString('input') ?? 'No input provided';

        await wait(2_000);
        await interaction.editReply({content:`Iaew World! 2`,ephemeral :true});
        await wait(2_000);
        await interaction.followUp({ content: 'vc falou ' + xxx, ephemeral: true });
        
    }
}