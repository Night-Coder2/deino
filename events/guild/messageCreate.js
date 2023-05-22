module.exports = (Discord, client, message) => {
    const prefix = '!'
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.prefix_commands.get(cmd)
  
    if (command) command.execute(message, args, cmd, client, Discord)
  }