const { SlashCommandBuilder } = require("discord.js");
const webscraper = require('../webscraper.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('problem')
        .setDescription('Returns random problem'),
    async execute(interaction) {
        await interaction.reply();
        
    },
};
