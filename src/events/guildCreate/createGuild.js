const Guild = require('../../mongooseModels/guildModel');

module.exports = async (client, guild) => {
    console.log('Bot was added to guild ' + guild.id);
    const guildDoc = new Guild({
        guildID: guild.id,
        currencySymbol: '$',
        workMin: 600,
        workMax: 1000
    });

    await guildDoc.save();
}