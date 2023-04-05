module.exports = (message, command, Discord) => {
  const validPermissions = [
    Discord.PermissionsBitField.Flags.CreateInstantInvite,
    Discord.PermissionsBitField.Flags.KickMembers,
    Discord.PermissionsBitField.Flags.BanMembers,
    Discord.PermissionsBitField.Flags.Administrator,
    Discord.PermissionsBitField.Flags.ManageChannels,
    Discord.PermissionsBitField.Flags.ManageGuild,
    Discord.PermissionsBitField.Flags.AddReactions,
    Discord.PermissionsBitField.Flags.ViewAuditLog,
    Discord.PermissionsBitField.Flags.PrioritySpeaker,
    Discord.PermissionsBitField.Flags.Stream,
    Discord.PermissionsBitField.Flags.ViewChannel,
    Discord.PermissionsBitField.Flags.SendMessages,
    Discord.PermissionsBitField.Flags.SendTTSMessages,
    Discord.PermissionsBitField.Flags.ManageMessages,
    Discord.PermissionsBitField.Flags.EmbedLinks,
    Discord.PermissionsBitField.Flags.AttachFiles,
    Discord.PermissionsBitField.Flags.ReadMessageHistory,
    Discord.PermissionsBitField.Flags.MentionEveryone,
    Discord.PermissionsBitField.Flags.UseExternalEmojis,
    Discord.PermissionsBitField.Flags.ViewGuildInsights,
    Discord.PermissionsBitField.Flags.Connect,
    Discord.PermissionsBitField.Flags.Speak,
    Discord.PermissionsBitField.Flags.MuteMembers,
    Discord.PermissionsBitField.Flags.DeafenMembers,
    Discord.PermissionsBitField.Flags.MoveMembers,
    Discord.PermissionsBitField.Flags.UseVAD,
    Discord.PermissionsBitField.Flags.ChangeNickname,
    Discord.PermissionsBitField.Flags.ManageNicknames,
    Discord.PermissionsBitField.Flags.ManageRoles,
    Discord.PermissionsBitField.Flags.ManageWebhooks,
    Discord.PermissionsBitField.Flags.UseApplicationCommands,
    Discord.PermissionsBitField.Flags.RequestToSpeak,
    Discord.PermissionsBitField.Flags.ManageEvents,
    Discord.PermissionsBitField.Flags.ManageThreads,
    Discord.PermissionsBitField.Flags.CreatePublicThreads,
    Discord.PermissionsBitField.Flags.CreatePrivateThreads,
    Discord.PermissionsBitField.Flags.UseExternalStickers,
    Discord.PermissionsBitField.Flags.SendMessagesInThreads,
    Discord.PermissionsBitField.Flags.UseEmbeddedActivities,
    Discord.PermissionsBitField.Flags.ModerateMembers,
    Discord.PermissionsBitField.Flags.ManageEmojisAndStickers
  ]

  if (command.permissions.length) {
    let invalidPerms = []
    for (const perm of command.permissions) {
      if (!validPermissions.includes(perm)) {
        return console.log(`Invalid Permissions ${perm}`);
      }
      if (!message.member.permissions.has(perm)) {
        invalidPerms.push(perm);
      }
    }
    if (invalidPerms.length) {
      return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
    }
  }
}