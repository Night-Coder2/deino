module.exports = {
  name: 'unmute',
  description: "This unmutes a member",
  execute(client, message, args, Discord){
    const target = message.mentions.users.first();
    if(target){
        let mainRole = message.guild.roles.cache.find(role => role.name === 'members');
        let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

        let memberTarget= message.guild.members.cache.get(target.id);

        memberTarget.roles.remove(muteRole);
        memberTarget.roles.add(mainRole);
        message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
    } else{
        message.channel.send('Cant find that member!');
    }
  }
}