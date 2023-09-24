const Guild = require('../../mongooseModels/guildModel');
const User = require('../../mongooseModels/userModel');

module.exports = async (client, guild) => {
    console.log('Bot was removed from guild ' + guild.id);
    await Guild.findOneAndDelete( { guildID: guild.id });
    await User.deleteMany( { guildID: guild.id });
}