const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Pong!',

    callback: async (client, interaction) => {
        try {
            await interaction.reply('Pong!');
        } catch (error) {
            console.error(`ERROR (ping.js): ${error}`);
            await interaction.reply('Sorry, no Pong! today.');
        }
    }
}