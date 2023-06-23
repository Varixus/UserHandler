const { EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: 'start',
    description: 'This command will allow you to play the economy game.',

    callback: async (client, interaction) => {
        try {

            const userSchema = new mongoose.Schema({
                name: String,
                userID: String,
                guildID: String,
                moneyAmount: Number,
            }, { collection: 'users', database: 'economyGame' });

            const User = mongoose.models.User || mongoose.model('User', userSchema);

            if(await User.countDocuments( { userID: interaction.user.id} ) > 0 && await User.countDocuments( { guildID: interaction.guild.id} ) > 0){
                interaction.reply('You are already registered.')
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

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.log(`ERROR (setupPlayer.js): ${error}`);
        }
    }
}