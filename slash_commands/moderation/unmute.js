const { SlashCommandBuilder, EmbedBuilder, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('unmute a member.')
    .addUserOption(option => option.setName('target').setDescription('The member you want to unmute').setRequired(true)),
  execute: async (client, interaction) => {
    if(interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ModerateMembers || Discord.PermissionsBitField.Flags.Administrator)){
        const target = interaction.options.getMember('target');
        const members = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'members');
        const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
        if(!role) return interaction.followUp({ content: 'There is no muted role in this server. Please create one.', ephemeral: true });
        await target.roles.remove(role.id);
        await target.roles.add(members.id);
        const embed = new EmbedBuilder()
            .setTitle('Member Unmuted')
            .setDescription(`**${target.user.tag}** has been unmuted.`)
            .setColor('00ff00')
            .setTimestamp();
        interaction.followUp({ embeds: [ embed ]});
    } else {
      await interaction.channel.send('You do not have permission to use this command.')
    }
  }
}
