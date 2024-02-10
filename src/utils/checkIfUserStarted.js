const { EmbedBuilder } = require('discord.js');
const User = require('../mongooseModels/userModel');

module.exports = async (interaction) => {
    if(await User.countDocuments( { userID: interaction.user.id} ) < 1 && await User.countDocuments( { guildID: interaction.guild.id} ) < 1){
        const embed = new EmbedBuilder()
            .setTitle('💸 UserHandler Economy Game 💸')
            .setColor('Red')
            .setDescription(`${interaction.user}, you have to be registered to use this command.`);

        await interaction.reply({ embeds: [embed] });
        return true;
    }
    return false;
}
