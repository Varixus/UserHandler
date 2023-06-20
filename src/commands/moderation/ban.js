const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a member from the server.',
    options: [
        {
            name: 'target-user',
            description: 'The user to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: 'reason',
            description: 'The reason for banning.',
            type: ApplicationCommandOptionType.String
        },
    ],
    permissionsRequired: [ PermissionFlagsBits.Administrator ],
    botPermission: [ PermissionFlagsBits.Administrator ],

    /**
    * @param {Client} client
    * @param {Interaction} interaction
    */

    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "No reason";
        
        await interaction.deferReply()

        const targetUser = await guild.members.fetch(targetUserId);

        if(!targetUser){
            await interaction.editReply("ERROR: That user does't exist in this server.");
            return;
        }

        if(targetUser.id === interaction.guild.ownerId)  {
            await interaction.editReply("ERROR: You can't ban the server owner.");
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if(targetUserRolePosition >= requestUserRolePosition){
            await interaction.editReply("ERROR: You can't ban a user with the same or higher role.");
            return;
        }

        if(targetUserRolePosition >= botRolePosition){
            await interaction.editReply("ERROR: User have higher role than bot.");
            return;
        }

        try {
            await targetUser.ban({ reason });
            await interaction.editReply(`${targetUser} was banned from the server.\n Reason: ${reason}`);
        } catch (error) {
            console.log(`There was an error when banning: ${error}`)
        }
    }
}