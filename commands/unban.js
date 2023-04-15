module.exports = {
  name: 'unban',
  description: "This command unban a member!",
  async execute(message, args, cmd, client, Discord) {
    if(message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers || Discord.PermissionsBitField.Flags.Administrator)){
    const [_, userID] = message.content.split(' ');
    const reason ='idk'
    await message.guild.bans.fetch()
      .then(async bans => {
        if (bans.size == 0) return await message.reply('nobody were banned from this server')
        let bannedID = await bans.find(ban => ban.user.id == userID);
        if(!bannedID) return await message.reply('ID specified wasnt banned from this server')
        if(await message.guild.bans.remove(userID, reason).catch(err => console.error(err))){
          message.reply('user successfully unbanned')
        }
      }).catch(err => console.error(err))
    } else {
      message.reply('you dont have the permissions to unban people')
    }
  },
}