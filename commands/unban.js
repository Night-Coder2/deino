module.exports = {
  name: 'unban',
  description: "This command unban a member!",
  execute(client, message, args, Discord) {
    const target = message.mentions.users.first();
    if (target) {
      const memberTarget = message.guild.members.cache.get(target.id);
      memberTarget.unban();
      message.channel.send("User has been unbanned");
    } else {
      message.channel.send(`You coudn't unban that member!`);
    }
  }
}