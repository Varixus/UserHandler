const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Pong',

    callback: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setColor('#2F3136')
            .setDescription(`Response time: ${client.ws.ping}ms`);

        interaction.reply({
            embeds: [embed]
        });
    }
}