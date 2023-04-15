module.exports = (Discord, client, guildMember) => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.id === '1095920881487847474');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('1094146203131846676').send(`Welcome <@${guildMember.user.id}> to our server! Make sure to check out the rules channel!`)
};