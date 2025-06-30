let handler = async (m, { conn, text }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

if (text) {
global.db.data.chats[m.chat].sBye = text
conn.reply(m.chat, '_*MENSAJE DE DESPEDIDA CONFIGURADO*_', fkontak, m)
} else {
conn.reply(m.chat, `*_ESCRIBE EL MENSAJE DE DESPEDIDA_*\n\n*⚡ @user (Usuario que sale o es expulsado)*\n*⚡ @group (Nombre del grupo)*\n*⚡ @desc (Descripción del grupo)*`, m)
}
}
handler.help = ['setbye @user + texto']
handler.tags = ['group']
handler.command = ['setbye'] 
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler