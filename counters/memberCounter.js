module.exports = async (client) =>{
    const guild = client.guilds.cache.get('1094146202632720504');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('1102252424728682626');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
    }, 5000);
}