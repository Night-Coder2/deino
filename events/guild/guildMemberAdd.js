module.exports = (Discord, client, guildMember) => {
  let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'members');
 
  guildMember.roles.add(welcomeRole);
  guildMember.guild.channels.cache.get('1091647689495683093').send(`Welcome <@${guildMember.user.id}> to our server! Make sure to check out the rules channel!`)
}