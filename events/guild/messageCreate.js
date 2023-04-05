module.exports = (Discord, client, message) => {
  const prefix = '!'
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd);

  if(command && message.member.roles.cache.has('1088787144077746238')) command.execute(client, message, args, Discord)
}