module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    execute(message, args, cmd, client, Discord){
      if(message.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers || Discord.PermissionsBitField.Flags.Administrator)){
        const target = message.mentions.users.first();
      if (target) {
        const memberTarget = message.guild.members.cache.get(target.id);
        
        // Check if the target member is the server owner
        if (memberTarget.id === message.guild.ownerId) {
          message.channel.send("You cannot kick the server owner!");
          return;
        }
        
        // Check if the target member has the "manager" role or is a bot
        const managerRole = message.guild.roles.cache.find(role => role.name === "manager");
        if (memberTarget.roles.cache.has(managerRole) || memberTarget.bot) {
          message.channel.send("You cannot kick this member!");
          return;
        }
        
        try {
          memberTarget.kick();
          message.channel.send("User has been kicked");
        } catch (err) {
          message.channel.send("You couldn't kick that member!");
          console.log(err);
        }
      } else {
        message.channel.send("You couldn't kick that member!");
      }
      }
    }
  }