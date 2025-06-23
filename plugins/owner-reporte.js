let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw '⚠ *_️Ingrese el error ue desea reportar._*'
    if (text.length < 10) throw '⚠️ *_Especifique bien el error, mínimo 10 caracteres._*'
    if (text.length > 1000) throw '⚠️ *_Máximo 1000 caracteres para enviar el error._*'
    const teks = `╭───────────────────\n│⊷〘 *R E P O R T E* 🤍 〙⊷\n├───────────────────\n│⁖🧡꙰  *Cliente:*\n│✏️ Wa.me/${m.sender.split`@`[0]}\n│\n│⁖💚꙰  *Mensaje:*\n│📩 ${text}\n╰───────────────────`
    await conn.reply(global.owner[0][0] + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })
    m.reply('⚠️ *_𝐄𝐥 𝐫𝐞𝐩𝐨𝐫𝐭𝐞 𝐬𝐞 𝐞𝐧𝐯í𝐨 𝐚 𝐦𝐢 𝐜𝐫𝐞𝐚𝐝𝐨𝐫, 𝐜𝐮𝐚𝐥𝐪𝐮𝐢𝐞𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐞 𝐟𝐚𝐥𝐬𝐨 𝐩𝐮𝐞𝐝𝐞 𝐨𝐜𝐚𝐬𝐢𝐨𝐧𝐚𝐫 𝐛𝐚𝐧𝐞𝐨._*')
}
handler.help = ['reportar']
handler.tags = ['info']
handler.command = ['reporte','report','reportar','bug','error']

export default handler