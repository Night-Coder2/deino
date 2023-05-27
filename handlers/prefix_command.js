const { readdirSync } = require("fs");

module.exports = (client, Discord, app) => {
    readdirSync("./prefix_commands").forEach(dir => {
        const commands = readdirSync(`./prefix_commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../prefix_commands/${dir}/${file}`);
            pull.name = file.replace(".js", "")
            pull.category = dir
            client.prefix_commands.set(pull.name, pull);
        
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}