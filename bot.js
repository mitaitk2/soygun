const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Slash Komutunu Tanımla
const commands = [
    new SlashCommandBuilder()
        .setName('duyuru')
        .setDescription('B U L G A R sistemine yeni bir duyuru ekler')
        .addStringOption(option => option.setName('mesaj').setDescription('Duyuru içeriğini yaz').setRequired(true))
];

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'duyuru') {
        const mesaj = interaction.options.getString('mesaj');
        
        // Duyuruyu kanala at
        await interaction.reply({ content: `Duyuru sisteme işlendi: ${mesaj}`, ephemeral: true });

        // Sitede görünmesi için dosyaya yaz
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        const messages = await channel.messages.fetch({ limit: 10 });
        const data = messages.map(m => ({
            yazar: m.author.username,
            icerik: m.content,
            tarih: new Date().toLocaleDateString('tr-TR')
        }));
        
        fs.writeFileSync('duyurular.json', JSON.stringify(data, null, 2));
    }
});

client.login(process.env.DISCORD_TOKEN);
