import fs from 'fs'
import acrcloud from 'acrcloud'
let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/audio|video/.test(mime)) { if ((q.msg || q).seconds > 20) return m.reply('╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\𝐧\𝐧𝐄𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 𝐪𝐮𝐞 𝐜𝐚𝐫𝐠𝐚 𝐞𝐬 𝐝𝐞𝐦𝐚𝐬𝐢𝐚𝐝𝐨 𝐠𝐫𝐚𝐧𝐝𝐞, 𝐥𝐞 𝐬𝐮𝐠𝐞𝐫𝐢𝐦𝐨𝐬 𝐪𝐮𝐞 𝐜𝐨𝐫𝐭𝐞 𝐞𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 𝐠𝐫𝐚𝐧𝐝𝐞 𝐚 𝐮𝐧 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 𝐦á𝐬 𝐩𝐞𝐪𝐮𝐞ñ𝐨, 10-20 𝐬𝐞𝐠𝐮𝐧𝐝𝐨𝐬 𝐋𝐨𝐬 𝐝𝐚𝐭𝐨𝐬 𝐝𝐞 𝐚𝐮𝐝𝐢𝐨 𝐬𝐨𝐧 𝐬𝐮𝐟𝐢𝐜𝐢𝐞𝐧𝐭𝐞𝐬 𝐩𝐚𝐫𝐚 𝐢𝐝𝐞𝐧𝐭𝐢𝐟𝐢𝐜𝐚𝐫')
await conn.reply(m.chat, wait, m)
let media = await q.download()
let ext = mime.split('/')[1]
fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
let { code, msg } = res.status
if (code !== 0) throw msg
let { title, artists, album, genres, release_date } = res.metadata.music[0]
let txt = `
𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙇𝘼 𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼𝙎 

• 📌 𝙏𝙄𝙏𝙐𝙇𝙊: ${title}
• 👨‍🎤 𝘼𝙍𝙏𝙄𝙎𝙏𝘼: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'No encontrado'}
• 💾 𝘼𝙇𝘽𝙐𝙈: ${album.name || 'No encontrado'}
• 🌐 𝙂𝙀𝙉𝙀𝙍𝙊: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'No encontrado'}
• 📆 𝙁𝙀𝘾𝙃𝘼 𝘿𝙀 𝙇𝘼𝙉𝙕𝘼𝙈𝙄𝙀𝙉𝙏𝙊: ${release_date || 'No encontrado'}
`.trim()
fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
m.reply(txt)
} else throw '╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉 𝘼𝙐𝘿𝙄𝙊 𝙊 𝙑𝙄𝘿𝙀𝙊'
}
handler.command = /^quemusica|quemusicaes|whatmusic$/i
export default handler