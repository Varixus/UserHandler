const { EmbedBuilder } = require('discord.js');
const User = require('../../mongooseModels/userModel');
const checkIfUserStarted = require('../../utils/checkIfUserStarted');

module.exports = {
    name: 'start',
    description: '💸 This command will allow you to play the economy game. 💸',

    callback: async (client, interaction) => {
        try {
            if(!checkIfUserStarted(interaction)){
                return;
            }
    
            const user = new User({
                userID: interaction.user.id,
                guildID: interaction.guild.id,
                moneyAmount: 0
            });

            await user.save();

            const embed = new EmbedBuilder()
                .setTitle('💸 UserHandler Economy Game 💸')
                .setColor('Green')
                .setDescription(`Thank you for registering, ${interaction.user}!`)
                .addFields(
                    { name: 'USER ID', value: user.userID, inline: true },
                    { name: 'GUILD ID', value: user.guildID, inline: true }
                );

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.log(`ERROR (start.js): ${error}`);
        }
    }
}