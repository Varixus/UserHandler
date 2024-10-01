const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Guild = require('../../mongooseModels/guildModel');

module.exports = {
    name: 'setwork',
    description: '💸 Changes the minimal or maximum amount the work command. 💸',
    options: [
        {
            name: 'option',
            description: 'Minimal (min) or maximum (max) amount.',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'amount',
            description: 'Amount to change min or max to.',
            required: true,
            type: ApplicationCommandOptionType.Number,
        }
    ],
    permissionsRequired: ['ADMINISTRATOR'], 

    callback: async (client, interaction) => {
        try {
            const guildData = await Guild.findOne( { guildID: interaction.guild.id });
            const option = interaction.options.getString('option');
            const amount = interaction.options.getNumber('amount');

            if(option === 'min' && amount <= guildData.workMax){
                await Guild.findOneAndUpdate({ guildID: interaction.guild.id }, { workMin: amount });
                await interaction.reply(`Minimum work reward amount set to ${amount}.`);
            } else if(option === 'max' && guildData.workMin <= amount){
                await Guild.findOneAndUpdate({ guildID: interaction.guild.id }, { workMax: amount });
                await interaction.reply(`Maximum work reward amount set to ${amount}.`);
            } else {
                const embed = new EmbedBuilder()
                .setTitle('⚙️ Economy Game Settings ⚙️')
                .setColor('Red')
                .setDescription(`ERROR: Given amount is invalid.`);
    
                interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }   
        } catch (error) {
            console.log(`ERROR (work.js): ${error}`);
        }
    }
}