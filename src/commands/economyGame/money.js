const { EmbedBuilder } = require('discord.js');
const Guild = require('../../mongooseModels/guildModel');
const User = require('../../mongooseModels/userModel');
const hasUserStarted = require('../../utils/hasUserStarted');

module.exports = {
    name: 'money',
    description: '💸 Take a look at your bank account. 💸',

    callback: async (client, interaction) => {
        try {
            if(!await hasUserStarted(interaction, true)){
                return;
            }

            const guildData = await Guild.findOne( { guildID: interaction.guild.id });
            const userData = await User.findOne({ userID: interaction.user.id });

            const embed = new EmbedBuilder()
                .setTitle('💸 Bank Account 💸')
                .setColor('Yellow')
                .setDescription(`You have ${userData.moneyAmount}${guildData.currencySymbol} in your bank account.`);

            await interaction.reply({embeds: [embed]});
        } catch (error) {
            console.log(`ERROR (money.js): ${error}`);
        }
    }
}