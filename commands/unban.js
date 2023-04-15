module.exports = {
  name: 'unban',
  description: "This command unban a member!",
<<<<<<< HEAD
  async execute(client, message, args, Discord) {
    const [_, targetID] = args[0]
    await message.guild.bans.fetch()
    .then(async bans => {
      if(bans.size == 0) return awai
    })
=======
  execute(message, args, cmd, client, Discord) {
    const target = message.mentions.users.first();
    if (target) {
      const memberTarget = message.guild.members.cache.get(target.id);
      memberTarget.unban();
      message.channel.send("User has been unbanned");
    } else {
      message.channel.send(`You coudn't unban that member!`);
    }
>>>>>>> 6db6263855d38d87b649c073dc61c7c2368cbada
  }
}