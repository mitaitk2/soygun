
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'announcements') {
        const metin = interaction.options.getString('mesaj');
        
        // 1. Kanalı ve Mesajları Çek
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        const messages = await channel.messages.fetch({ limit: 10 });
        
        // 2. Veriyi JSON formatına dönüştür
        const data = messages.map(m => ({
            yazar: m.author.username,
            icerik: m.content,
            tarih: new Date().toLocaleDateString('tr-TR')
        }));

        // 3. Dosyayı Güncelle
        fs.writeFileSync('duyurular.json', JSON.stringify(data, null, 2));
        
        await interaction.reply({ content: 'Duyuru sisteme işlendi ve siteye aktarıldı.', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
