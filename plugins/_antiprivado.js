export async function before(m, { conn, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const botSettings = global.db.data.settings[this.user.jid] || {};

  if (botSettings.antiPrivate && !isOwner && !isROwner) {
    const mensaje = `𝙃𝙤𝙡𝙖 👋, 𝙎𝙤𝙮 𝘼𝙡𝙚𝙚𝘽𝙤𝙩 🤖!
•𝙀𝙨𝙩𝙖 𝙋𝙧𝙤𝙝𝙞𝙗𝙞𝙙𝙤 𝙀𝙨𝙘𝙧𝙞𝙗𝙞𝙧𝙢𝙚 𝘼𝙡 𝙋𝙧𝙞𝙫𝙖𝙙𝙤 🚫.
𝙎𝙞 𝘿𝙚𝙨𝙚𝙖𝙨 𝘼𝙙𝙦𝙪𝙞𝙧𝙞𝙧 𝘼𝙡𝙚𝙚𝘽𝙤𝙩 🤖, 𝙈𝙚𝙣𝙨𝙪𝙖𝙡𝙢𝙚𝙣𝙩𝙚 𝙤 𝙥𝙚𝙧𝙢𝙖𝙣𝙚𝙣𝙩𝙚𝙢𝙚𝙣𝙩𝙚 𝙡𝙤 𝙥𝙪𝙚𝙙𝙚𝙨 𝙝𝙖𝙘𝙚𝙧𝙡𝙤 𝙖𝙡 ✅: 

https://wa.me/573206095607?text=.Adquirir

𝙏𝙖𝙢𝙗𝙞𝙚𝙣 𝙨𝙚 𝙝𝙖𝙘𝙚𝙣 𝙗𝙤𝙩𝙨 𝙥𝙚𝙧𝙨𝙤𝙣𝙖𝙡𝙞𝙯𝙖𝙙𝙤𝙨 🤖🖌️!`;

    await conn.sendMessage(m.chat, {
      text: mensaje,
      contextInfo: {
        externalAdReply: {
          title: '𝐁𝐨𝐭 𝐁𝐲 𝐀𝐥𝐞𝐞 👑',
          body: '𝐁𝐨𝐭 𝐁𝐲 𝐀𝐥𝐞𝐞 👑',
          thumbnailUrl: 'https://qu.ax/FxpUy.jpg',
          sourceUrl: '',
          mediaType: 1,
          renderLargerThumbnail: false,
          showAdAttribution: false
        }
      }
    });

    await conn.updateBlockStatus(m.chat, 'block');
    console.log(`Usuario ${m.sender} bloqueado por contacto privado.`);
  }

  return false;
}