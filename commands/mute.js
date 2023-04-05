const ms = require('ms');
module.exports = {
  name: 'mute',
  description: "This mutes a member",
  execute(client, message, args, Discord) {
    if(message.member.permissions.has(Discord.PermissionsBitField.Flags.ModerateMembers || Discord.PermissionsBitField.Flags.Administrator)){
      const target = message.mentions.users.first();
      if (target) {
  
          let mainRole = message.guild.roles.cache.find(role => role.name === 'members');
          let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
  
          let memberTarget = message.guild.members.cache.get(target.id);
  
          if (!args[1]) {
              memberTarget.roles.remove(mainRole);
              memberTarget.roles.add(muteRole);
              message.channel.send(`<@${memberTarget.user.id}> has been muted`);
              return
          }
          memberTarget.roles.remove(mainRole);
          memberTarget.roles.add(muteRole);
          message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
  
          setTimeout(function () {
              memberTarget.roles.remove(muteRole.id);
              memberTarget.roles.add(mainRole.id);
          }, ms(args[1]));
      } else {
          message.channel.send('Cant find that member!');
      }
    }
  }
}
