require('dotenv/config')
const TOKEN = process.env.TOKEN
const Discord = require('discord.js');
const express = require('express');
const { Collection } = require('discord.js');
const app = express();
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers
  ]
})

client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();

for(let handler of  ["slash_command", "prefix_command", "event"]) require(`./handlers/${handler}`)(client, Discord);
client.login(TOKEN);
app.listen(3000, () => {
  console.log('server started');
});