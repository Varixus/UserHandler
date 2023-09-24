const Guild = require('../../mongooseModels/guildModel');
const User = require('../../mongooseModels/userModel');
const checkIfUserStarted = require('../../utils/checkIfUserStarted');

module.exports = {
    name: 'work',
    description: '💸 You will get to work. 💸',

    callback: async (client, interaction) => {
        try {
            if(!checkIfUserStarted(interaction)){
                return;
            }

            const guildData = await Guild.findOne( { guildID: interaction.guild.id });
            const userData = await User.findOne({ userID: interaction.user.id });

            const min = guildData.workMin;
            const max = guildData.workMax;

            const randomAmount = Math.floor(Math.random() * (max - min)) + min;

            await User.findOneAndUpdate({ userID: interaction.user.id }, { moneyAmount: userData.moneyAmount +  randomAmount });
            await interaction.reply(`You made ${randomAmount}${guildData.currencySymbol}`);


        } catch (error) {
            console.log(`ERROR (work.js): ${error}`);
        }
    }
}