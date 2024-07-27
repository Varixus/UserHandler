const { ActivityType } = require('discord.js');
const getLocalCommands = require('../../utils/getLocalCommands');
const Guild = require('../../mongooseModels/guildModel');
const createGuild = require('../guildCreate/createGuild.js');

module.exports = async (client) => {
    console.log(`${client.user.tag} is online.`);

    const guilds = client.guilds.cache.map(guild => guild);
    for(const guild of guilds){
        if(await Guild.countDocuments( { guildID: guild.id} ) < 1){ // check if all guilds have database entry
            console.log(guild.id + " not in database");
            createGuild(client, guild);
        }

        guild.commands.set(getLocalCommands());
    }

    client.application.commands.set([]);

    client.user.setActivity({
        name: "geheime Schmuddelfilme",
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=iUocPN1ncR4',
    });
};