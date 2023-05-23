module.exports = {
    name: 'purge',
    description: "This is used to delete message.",
    async execute(message, args, cmd, client, Discord) {
      if(message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages || Discord.PermissionsBitField.Flags.Administrator)){
        if(!args[0]) return message.reply("Please enter the number of messages you want to delete.");
        if(isNaN(args[0])) return message.reply("Please enter a real number!");
    
        if(args[0] > 100) return message.reply("You cant delete more than 100 messages.")
        if(args[0] < 1)return message.reply("You must delete atleast one message.")
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
          message.channel.bulkDelete(messages)
        })
      }
    }
  }