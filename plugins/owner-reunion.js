let handler = async(m, { conn, command, text }) => {
  if (!text) return m.reply(`🍬 Por favor, ingresa el motivo de la reunión.`)
    if (text.length < 11) return m.reply(`🍭 Por favo, ingresé al menos 11 caracteres.`)

let texto = `🍨 El Owner @${m.sender.split`@`[0]} a empezado una reunión entra lo más pronto al grupo del staff...\n*➪ Motivo: ${text}*`
m.reply('🍭 𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐝𝐞 𝐫𝐞𝐮𝐧𝐢ó𝐧 𝐚 𝐭𝐨𝐝𝐨𝐬 𝐥𝐨𝐬 𝐨𝐰𝐧𝐞𝐫𝐬.')
for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await conn.onWhatsApp(jid))[0] || {}
                        if (data.exists)
                        conn.sendPayment(data.jid, '999999999', texto, m)
                    }

}
handler.tags = ['owner']
handler.command = handler.help =['reunion','reunionstaff']
handler.rowner = true

export default handler