module.exports = {
  name: 'kick',
  description: "This command kicks a member!",
  execute(message, args, cmd, client, Discord){
    if(message.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers || Discord.PermissionsBitField.Flags.Administrator)){
      const target = message.mentions.users.first();
      if(target){
          const memberTarget = message.guild.members.cache.get(target.id);
          memberTarget.kick();
          message.channel.send("User has been kicked");
      }else{
          message.channel.send(`You coudn't kick that member!`);
      }
    }
  }
}