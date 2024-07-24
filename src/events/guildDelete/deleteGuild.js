const Guild = require('../../mongooseModels/guildModel');
const User = require('../../mongooseModels/userModel');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


module.exports = async (client, guild) => {
    console.log('Bot was removed from guild ' + guild.id);
    await Guild.findOneAndDelete( { guildID: guild.id });
    await User.deleteMany( { guildID: guild.id });
}