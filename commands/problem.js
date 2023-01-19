const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('problem')
        .setDescription('Returns random problem'),
    async execute(interaction) {
        await interaction.reply('Problem');
    },
};
