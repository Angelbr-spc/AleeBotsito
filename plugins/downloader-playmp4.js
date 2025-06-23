
import fetch from 'node-fetch';

let handler = async (m, { conn, args, text}) => {
  if (!text) throw m.reply('⚠️ 𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐩𝐫𝐨𝐩𝐨𝐫𝐜𝐢𝐨𝐧𝐚 𝐮𝐧𝐚 𝐜𝐨𝐧𝐬𝐮𝐥𝐭𝐚.');

  const sender = m.sender.split('@')[0];

  try {
    m.reply('🔄 *𝐏𝐫𝐨𝐜𝐞𝐬𝐚𝐧𝐝𝐨 𝐭𝐮 𝐬𝐨𝐥𝐢𝐜𝐢𝐭𝐮𝐝...*');

    const res = await fetch(`https://fastrestapis.fasturl.cloud/downup/ytdown-v1?name=${encodeURIComponent(text)}&format=mp4&quality=720&server=auto`);
    const json = await res.json();

    if (!json?.result?.media) {
      throw new Error('❌ No se encontró el contenido.');
}

    const { thumbnail, description, lengthSeconds} = json.result.metadata;
    const { media, title, quality} = json.result;

    const caption = `🎥 *DESCARGA EXITOSA*\n\n📌 *Título:* ${title}\n⏳ *Duración:* ${lengthSeconds} segundos\n🌟 *Calidad:* ${quality}\n\n📄 *Descripción:*\n${description}`;

    // Enviar imagen con información
    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail},
        caption: caption,
        mentions: [m.sender]
},
      { quoted: m}
);

    // Enviar el video como archivo normal
    await conn.sendMessage(
      m.chat,
      {
        video: { url: media},
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        caption: `✅ *Aquí tienes tu video, @${sender}* 🎬`,
        mentions: [m.sender]
},
      { quoted: m}
);

} catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: '⚠️ 𝐈𝐧𝐭𝐞𝐧𝐭𝐞 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞, 𝐞𝐥 𝐯í𝐝𝐞𝐨 𝐞𝐬 𝐦𝐮𝐲 𝐩𝐞𝐬𝐚𝐝𝐨 𝐨 𝐡𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐩𝐫𝐨𝐜𝐞𝐬𝐚𝐫𝐥𝐨.', mentions: [m.sender]}, { quoted: m});
}
};

handler.help = ['play2 <consulta>'];
handler.tags = ['downloader'];
handler.command = ["play2"];

export default handler;
