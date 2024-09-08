const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Pong!',

    callback: async (client, interaction) => {
        try {
            const embed = new EmbedBuilder()
                .setColor('#2F3136')
                .setDescription('Pong!');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(`ERROR (ping.js): ${error}`);
            await interaction.reply('Sorry, I couldn\'t fetch the ping for you right now.');
        }
    }
}