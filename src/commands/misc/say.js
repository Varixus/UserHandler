const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'say',
    description: 'The bot will repeat your message.',
    options: [
        {
            name: 'message',
            description: 'The message the bot will repeat.',
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],

    callback: async (client, interaction) => {
        await interaction.reply({
            content: interaction.options.getString('message'),
            ephemeral: false,
        });
    }
}