const Guild = require('../../mongooseModels/guildModel');

module.exports = async (client, guild) => {
    console.log('Database entry for guild ' + guild.id + ' was created');
    const guildDoc = new Guild({
        guildID: guild.id,
        currencySymbol: '$',
        workMin: 600,
        workMax: 1000
    });

    await guildDoc.save();
}