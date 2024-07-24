const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'setwork',
    description: '💸 Changes the minimal or maximum amount the work command. 💸',
    options: [
        {
            name: 'option',
            description: 'Minimal or maximum amount.',
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],

    callback: async (client, interaction) => {
        try {

            // code

        } catch (error) {
            console.log(`ERROR (work.js): ${error}`);
        }
    }
}