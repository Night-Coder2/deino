module.exports = {
  name: 'ban',
  description: "This command bans a member!",
  execute(message, args, cmd, client, Discord) {
    if(message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers || Discord.PermissionsBitField.Flags.Administrator)){
      const target = message.mentions.users.first();
      if (target) {
          const memberTarget = message.guild.members.cache.get(target.id);
          memberTarget.ban();
          message.channel.send("User has been banned");
      } else {
        message.channel.send(`You coudn't ban that member!`);
      }
    }
  }
}