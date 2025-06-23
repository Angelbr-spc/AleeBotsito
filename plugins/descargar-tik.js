
import fetch from "node-fetch";
const obtenerTikTok = async (query) => {
    try {
        const apiUrl = `https://api.siputzx.my.id/api/s/tiktok?query=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status && data.data && data.data.length> 0) {
            return data.data.slice(0, 5);
}
        return null;
} catch (error) {
        console.error("❌ Error al obtener videos de TikTok:", error);
        return null;
}
};
const handler = async (m, { conn, text}) => {
    if (!text) {
        return m.reply("🔍 *𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐢𝐧𝐠𝐫𝐞𝐬𝐚 𝐞𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐥 𝐯𝐢𝐝𝐞𝐨 𝐝𝐞 𝐓𝐢𝐤𝐓𝐨𝐤.*");
}

    m.react("⏳");

    const resultados = await obtenerTikTok(text);

    if (resultados) {
        m.reply(`✅ *Se encontraron ${resultados.length} videos de TikTok.* Enviando ahora...`);

        for (const resultado of resultados) {
            let mensaje = `
🎥 *Título:* ${resultado.title}
📅 *Fecha:* ${resultado.date}

👤 *Autor:*
- 🏷️ *Nombre:* ${resultado.author.nickname}
- ✨ *Username:* @${resultado.author.unique_id}
`;

            await conn.sendFile(m.chat, resultado.play, "tiktok.mp4", mensaje, m);
}
} else {
        m.reply("⚠️ *𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐫𝐨𝐧 𝐫𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨𝐬, 𝐢𝐧𝐭𝐞𝐧𝐭𝐚 𝐜𝐨𝐧 𝐨𝐭𝐫𝐨 𝐭é𝐫𝐦𝐢𝐧𝐨.*");
}
};

handler.command = ["tik"];
export default handler;