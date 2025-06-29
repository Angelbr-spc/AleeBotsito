let handler = async (m, { conn, isAdmin, isROwner }) => {
  if (!(isAdmin || isROwner)) return dfail('admin', m, conn)

  global.db.data.chats[m.chat].isBanned = true

  await conn.sendMessage(m.chat, {
    text: '🚫 𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐅𝐮𝐞 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐜𝐡𝐚𝐭.',
    contextInfo: {
      externalAdReply: {
        title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
        body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
        mediaType: 1,
        thumbnailUrl: 'https://qu.ax/JRCMQ.jpg',
        renderLargerThumbnail: false,
        sourceUrl: ''
      }
    }
  }, { quoted: m })

  await m.react('☑️')
}

handler.help = ['banearbot']
handler.tags = ['group']
handler.command = ['banearbot', 'banchat']
handler.group = true

export default handler