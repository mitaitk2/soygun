/*
  Karantina System - Web Panel
  GitHub: github.com/kullaniciadi/Karantina-System
*/

// 1. Stilleri (CSS) JS ile sayfaya enjekte et
const style = document.createElement('style');
style.innerHTML = `
    * { box-sizing: border-box; }
    body { background-color: #0b0b0b; color: #eee; font-family: 'Segoe UI', sans-serif; display: flex; flex-direction: column; align-items: center; padding: 40px 20px; margin: 0; gap: 25px; }
    .karantina-box { background: #151515; border-left: 6px solid #ff0000; padding: 25px; width: 100%; max-width: 650px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
    .stats-box { display: flex; justify-content: space-around; background: #111; padding: 25px; width: 100%; max-width: 650px; border-radius: 12px; border: 1px solid #222; }
    .stat-item { text-align: center; }
    .stat-label { display: block; color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
    .stat-value { font-size: 26px; font-weight: 900; color: #fff; }
    .actions-box { display: flex; gap: 15px; width: 100%; max-width: 650px; }
    .btn { flex: 1; padding: 16px; text-align: center; text-decoration: none; font-weight: bold; border-radius: 8px; color: white; text-transform: uppercase; transition: 0.3s; }
    .btn-discord { background: #5865f2; }
    .btn-bot { background: #ffffff; color: #000; }
    .btn:hover { filter: brightness(1.2); transform: translateY(-3px); }
`;
document.head.appendChild(style);

// 2. HTML yapısını oluştur
const root = document.getElementById('root');
root.innerHTML = `
    <div class="karantina-box">
        <h2 style="color:#ff0000;">⤹ KARANTINA & @YENIDEN</h2>
        <p style="color:#bbb; font-style:italic;">👑﹕✶⋆.˚﹕K A R A N T I N A sunucumuz toplum icerisinde Kara Mizah sunucusu olarak geçen bir sunucudur adaletin adresidir.</p>
    </div>
    <div class="stats-box">
        <div class="stat-item">
            <span class="stat-label">Çevrimiçi</span>
            <span id="st-online" class="stat-value">0</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Seste</span>
            <span id="st-voice" class="stat-value">0</span>
        </div>
    </div>
    <div class="actions-box">
        <a href="https://discord.gg/karantina" target="_blank" class="btn btn-discord">SUNUCUYA KATIL</a>
        <a href="https://discord.com/oauth2/authorize?client_id=1452704409233653962" target="_blank" class="btn btn-bot">BOTU DAVET ET</a>
    </div>
`;

// 3. Veri Çekme Fonksiyonu
async function updateStats() {
    try {
        const res = await fetch('https://discord.com/api/guilds/1403472039670583487/widget.json');
        const data = await res.json();
        document.getElementById('st-online').innerText = data.presence_count || 0;
        if (data.members) {
            document.getElementById('st-voice').innerText = data.members.filter(m => m.channel_id).length;
        }
    } catch (e) {
        console.error("Widget hatası!");
    }
}

updateStats();
setInterval(updateStats, 30000);
