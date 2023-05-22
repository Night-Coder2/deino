const { SlashCommandBuilder, MessageEmbed} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("pd")
    .setDescription(`Get the pokemon's pokedex entry`)
    .addStringOption(option => option.setName('pokemon').setDescription(`Get the pokemon's pokedex entry`).setRequired(true)),
    execute: async (client, interaction) => {
        const pokemonName = interaction.options.getString('pokemon')

        if (!pokemonName) {
            await interaction.reply('Please provide a Pokémon name.');
            return;
        }
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((res) => res.json())
            .then((data) => {
                // Retrieve necessary data
                const PokemonName = data.name;
                const id = data.id;
                const height = data.height;
                const weight = data.weight;
                const types = data.types.map((typeData) => typeData.type.name);
                const abilities = data.abilities.map((abilityData) => abilityData.ability.name);
                const name =  id+'.'+PokemonName

                // Fetch type details to determine weaknesses
                Promise.all(
                    types.map((type) =>
                        fetch(`https://pokeapi.co/api/v2/type/${type}`)
                            .then((res) => res.json())
                            .then((typeData) => typeData.damage_relations.double_damage_from.map((weakness) => weakness.name))
                    )
                )
                    .then((weaknesses) => {
                        const flattenedWeaknesses = weaknesses.flat(); // Flatten the array of weaknesses

                        // Format the data into an embed
                        const embed = {
                            title: name,
                            description: `**Height:** ${height} foot\n**Weight:** ${weight} lbs\n**Type:** ${types.join(', ')}\n**Abilities:** ${abilities.join(', ')}\n**Weaknesses:** ${flattenedWeaknesses.join(', ')}`,
                            fields: [],
                            color: 3447003, // Blue color value
                        };

                        // Add additional fields if available
                        if (data.species) {
                            embed.fields.push({
                                name: 'Species',
                                value: data.species.name,
                            });
                        }

                        if (data.stats) {
                            const stats = data.stats.map((statData) => `**${statData.stat.name}:** ${statData.base_stat}`);
                            embed.fields.push({
                                name: 'Stats',
                                value: stats.join('\n'),
                            });
                        }

                        if (data.sprites && data.sprites.front_default) {
                            embed.thumbnail = {
                                url: data.sprites.front_default,
                            };
                        }

                        // Send message with the embed
                        interaction.channel.send({ embeds: [embed] });
                    })
                    .catch((error) => {
                        interaction.reply('Failed to fetch Pokémon data');
                    });
            })
            .catch((error) => {
                interaction.reply('Pokémon not found');
            });
    },
}