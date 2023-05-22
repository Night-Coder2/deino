const { readdirSync } = require("fs");

module.exports = (client, Discord) => {
    readdirSync("./slash_commands").forEach(dir => {
        const commands = readdirSync(`./slash_commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../slash_commands/${dir}/${file}`);

            client.slash_commands.set(pull.data.name, pull);
        
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}