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

            await interaction.reply(`You have ${userData.moneyAmount}${guildData.currencySymbol}`);
        } catch (error) {
            console.log(`ERROR (money.js): ${error}`);
        }
    }
}