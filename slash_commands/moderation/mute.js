const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutes a member for a given time.')
    .addUserOption(option => option.setName('target').setDescription('The member you want to mute').setRequired(true))
    .addStringOption(option => option.setName('time').setDescription('The time you want to mute the member for').setRequired(true)),
  execute: async (client, interaction) => {
    if(interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ModerateMembers || Discord.PermissionsBitField.Flags.Administrator)){
        const target = interaction.options.getMember('target');
        const time = interaction.options.getString('time');
        const members = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'members');
        const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
        if(!role) return interaction.followUp({ content: 'There is no muted role in this server. Please create one.', ephemeral: true });
        if(target.roles.cache.has(role.id)) return interaction.followUp({ content: 'This member is already muted.', ephemeral: true });
        await target.roles.add(role.id);
        await target.roles.remove(members.id);
        const embed = new Discord.MessageEmbed()
        .setTitle('Member Muted')
        .setDescription(`**${target.user.tag}** has been muted for ${ms(ms(time))}.`)
        .setColor('GREEN')
        .setFooter('Mute Member')
        .setTimestamp();
        interaction.followUp({ embeds: [ embed ]});
        setTimeout(async () => {
            await target.roles.remove(role.id);
            await target.roles.add(members.id);
            const embed = new Discord.MessageEmbed()
            .setTitle('Member Unmuted')
            .setDescription(`**${target.user.tag}** has been unmuted.`)
            .setColor('GREEN')
            .setFooter('Unmute Member')
            .setTimestamp();
            interaction.followUp({ embeds: [ embed ]});
        }, ms(time));
    }
  }
}
