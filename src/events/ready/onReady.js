const { ActivityType } = require('discord.js');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
    console.log(`${client.user.tag} is online.`);

    const guilds = client.guilds.cache.map(guild => guild);
    for(const guild of guilds){
        guild.commands.set(getLocalCommands());
    }

    client.user.setActivity({
        name: "geheime Schmuddelfilme",
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=iUocPN1ncR4',
    });
};