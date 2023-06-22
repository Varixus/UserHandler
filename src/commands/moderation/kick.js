const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
  
module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
  
    name: 'kick',
    description: 'Kicks a member from this server.',
    options: [
        {
            name: 'target-user',
            description: 'The user you want to kick.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason you want to kick.',
            type: ApplicationCommandOptionType.String
        }
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],

    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason =
            interaction.options.get('reason')?.value || 'No reason';
    
        await interaction.deferReply();
    
        const targetUser = await interaction.guild.members.fetch(targetUserId);
    
        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }
    
        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't kick that user because they're the server owner.");
            return;
        }
    
        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;
    
        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("You can't kick that user because they have the same/higher role than you.");
            return;
        }
    
        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't kick that user because they have the same/higher role than me.");
            return;
        }

        try {
            await targetUser.kick({ reason });

            const embed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Kick')
                .addFields(
                    { name: 'User', value: `${targetUser} was kicked from the server.`},
                    { name: 'Reason', value: `${reason}` }
                );

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(`ERROR (kick.js): ${error}`);
        }
    },
};