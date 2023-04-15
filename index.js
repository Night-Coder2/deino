require('dotenv/config')
const TOKEN = process.env.TOKEN
const Discord = require('discord.js');
const express = require('express')
const app = express();
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers
  ]
})

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}.js`)(client, Discord);
})

client.guilds.cache.get().

client.login(TOKEN);
app.listen(3000, () => {
  console.log('server started');
});