const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Guild = require('../../mongooseModels/guildModel');
const User = require('../../mongooseModels/userModel');
const hasUserStarted = require('../../utils/hasUserStarted');

module.exports = {
    name: 'slot',
    description: '💸 Play slots in the casino. 💸',
    options: [
        {
            name: 'amount',
            description: 'Amount you want to play with.',
            required: true,
            type: ApplicationCommandOptionType.Number,
        }
    ],
    
    callback: async (client, interaction) => {
        try {
            if(!await hasUserStarted(interaction, true)){
                return;
            }
            
            const guildData = await Guild.findOne( { guildID: interaction.guild.id });
            const userData = await User.findOne({ userID: interaction.user.id });

            const amount = interaction.options.getNumber('amount');

            const embed = new EmbedBuilder()
                .setTitle('💸 Slot Machine 💸')
                .setColor('Red')

            if(userData.moneyAmount < amount || amount <= 0){
                embed.setDescription('ERROR: Invalid amount.')
                interaction.reply({ embeds: [embed] });
                return;
            }

            const slotSymbols = ['🍓', '🍍', '🍇'];
            const random = Math.random() * 100;

            if(random <= 20){ // TODO: change to mongoose var (win percentage)
                const symbol = slotSymbols[randIndex(slotSymbols.length)];

                const winningMultiplier = 2; // TODO: change to mongoose database var
                const winningAmount = amount * winningMultiplier;

                embed.setColor('Green');
                embed.setDescription(`\n${symbol}   |   ${symbol}   |   ${symbol}\n\nYou win ${winningAmount}${guildData.currencySymbol}!`);

                await User.findOneAndUpdate({ userID: interaction.user.id }, { moneyAmount: userData.moneyAmount +  winningAmount });
            } else {
                const spinResult = [slotSymbols[randIndex(slotSymbols.length)], slotSymbols[randIndex(slotSymbols.length)], slotSymbols[randIndex(slotSymbols.length)]];

                if(spinResult[0] === spinResult[1] && spinResult[1] === spinResult[2]){
                    for(let i = 0; i < slotSymbols.length; i++){
                        if(slotSymbols[i] !== spinResult[0]){
                            spinResult[0] = slotSymbols[i];
                        }
                    }
                }

                embed.setDescription(`\n${spinResult[0]}   |   ${spinResult[1]}   |   ${spinResult[2]}\n\nYou lost ${amount}${guildData.currencySymbol}.`);

                await User.findOneAndUpdate({ userID: interaction.user.id }, { moneyAmount: userData.moneyAmount -  amount });
            }

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.log(`ERROR (slot.js): ${error}`);
        }
    }
}

function randIndex(maxIndex){
    return Math.floor(Math.random() * maxIndex);
}