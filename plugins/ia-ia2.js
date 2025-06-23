/* 
- Código Creado Por Izumi-kzx
- Código Auténtico Por Code Titans
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/
// *[ 🧇 BING IMAGE ]*
import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default
let handler = async (m, { conn, text }) => {
if (!text) return m.reply('𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐞𝐥 𝐭𝐞𝐱𝐭𝐨 𝐝𝐞 𝐥𝐨 𝐪𝐮𝐞 𝐪𝐮𝐢𝐞𝐫𝐞𝐬 𝐛𝐮𝐬𝐜𝐚𝐫 𝐞𝐧 𝐢𝐦á𝐠𝐞𝐧𝐞𝐬 🔍')
try {
async function createImage(url) {
const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer })
return imageMessage
}
let push = []
let api = await fetch(`https://delirius-apiofc.vercel.app/search/bingimage?query=${encodeURIComponent(text)}`)
let json = await api.json()
if (!json.results || json.results.length === 0) return m.reply('𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐫𝐨𝐧 𝐢𝐦á𝐠𝐞𝐧𝐞𝐬 𝐩𝐚𝐫𝐚 𝐭𝐮 𝐛ú𝐬𝐪𝐮𝐞𝐝𝐚.')
for (let item of json.results.slice(0, 5)) {
let image = await createImage(item.direct)
push.push({
body: proto.Message.InteractiveMessage.Body.fromObject({ text: `◦ *Título:* ${item.title || 'Sin título'}` }),
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
header: proto.Message.InteractiveMessage.Header.fromObject({ title: '', hasMediaAttachment: true, imageMessage: image }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{"display_text":"🌐 Ver Fuente","url":"${item.source}"}`
}]
})
})
}
const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({ text: `🔎 *Resultados de:* ${text}` }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: '📸 Imágenes encontradas' }),
header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
})
}
}
}, { quoted: m })
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} catch (error) {
console.error(error)
m.reply('𝐎𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐛𝐮𝐬𝐜𝐚𝐫 𝐥𝐚𝐬 𝐢𝐦á𝐠𝐞𝐧𝐞𝐬. 𝐈𝐧𝐭é𝐧𝐭𝐚𝐥𝐨 𝐝𝐞 𝐧𝐮𝐞𝐯𝐨.')
}
}
handler.command = /^(bingsearch)$/i
export default handler