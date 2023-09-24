const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, guild) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, guild.id);

        for(const localCommand of localCommands){
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            )

            if(existingCommand){
                if(localCommand.deleted){
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command -${name}- on guild ${guild.id}.`);
                    continue;
                }

                if(areCommandsDifferent(existingCommand, localCommand)){
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`Edited command -${name}- on guild ${guild.id}.`)
                }
            } else {
                if(localCommand.deleted) {
                    console.log(`Skipping registering command -${name}- on guild ${guild.id} as it's set to delete.`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                })

                console.log(`Registered command -${name}- on guild ${guild.id}.`)
            }
        };
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};