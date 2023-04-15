module.exports = {
  name: 'unban',
  description: "This command unban a member!",
  async execute(client, message, args, Discord) {
    const [_, targetID] = args[0]
    await message.guild.bans.fetch()
    .then(async bans => {
      if(bans.size == 0) return awai
    })
  }
}