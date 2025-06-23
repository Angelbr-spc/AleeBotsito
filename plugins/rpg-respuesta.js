let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`*👑 Ejemplo:*\n\n${usedPrefix + command} <id> <mensaje>\n\n*⚡ Uso:* ${usedPrefix + command} 1234 Gracias por tu confesión.`);

    let split = text.trim().split(/ (.+)/); 
    let id = split[0]; 
    let pesan = split[1]; 

    if (!id || !pesan) throw m.reply(`*👑 Ejemplo:*\n\n${usedPrefix + command} <id> <mensaje>\n\n*⚡ Uso:* ${usedPrefix + command} 1234 Gracias por tu confesión.`);

    id = id.trim();
    pesan = pesan.trim();


    console.log("conn.menfess", conn.menfess); 

    if (!conn.menfess || !conn.menfess[id]) {
        throw m.reply(`*⚠️ Error:* No se encontró ningún mensaje con el ID *${id}*.`);
    }

    let { dari, penerima } = conn.menfess[id];

    if (m.sender !== penerima) throw m.reply('⚡ 𝐍𝐨 𝐭𝐢𝐞𝐧𝐞𝐬 𝐩𝐞𝐫𝐦𝐢𝐬𝐨 𝐩𝐚𝐫𝐚 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 𝐚 𝐞𝐬𝐭𝐞 𝐦𝐞𝐧𝐬𝐚𝐣𝐞.');

    let teks = `*Hola, recibiste una respuesta a tu mensaje anónimo.*\n\n*\`ID:\`* *${id}*\n*\`RESPUESTA:\`* \n\n${pesan}`.trim();

    try {

        let sentMessage = await conn.sendMessage(dari, {
            text: teks,
            contextInfo: {
                mentionedJid: [dari],
                externalAdReply: {
                    title: 'R E S P U E S T A S',
                    body: '¡Gracias por usar el servicio de confesiones!',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y'
                }
            }
        });

        if (sentMessage) {
           return conn.reply(m.chat, '*⚡ Respuesta enviada con éxito.*\n*IDENTIFICADOR:*' + ` *${id}*`, m, fake);


            conn.menfess[id].status = true;
        } else {
            throw new Error('No se pudo enviar el mensaje.');
        }
    } catch (e) {
        console.error(e);
        m.reply('⚠️ 𝐎𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐞𝐧𝐯𝐢𝐚𝐫 𝐥𝐚 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚. 𝐀𝐬𝐞𝐠ú𝐫𝐚𝐭𝐞 𝐝𝐞 𝐪𝐮𝐞 𝐞𝐥 𝐧ú𝐦𝐞𝐫𝐨 𝐞𝐬 𝐯á𝐥𝐢𝐝𝐨 𝐲 𝐪𝐮𝐞 𝐞𝐥 𝐫𝐞𝐦𝐢𝐭𝐞𝐧𝐭𝐞 𝐩𝐮𝐞𝐝𝐞 𝐫𝐞𝐜𝐢𝐛𝐢𝐫 𝐦𝐞𝐧𝐬𝐚𝐣𝐞𝐬.');
    }
};

handler.tags = ['rg'];
handler.help = ['respuesta'].map(v => v + ' <id mensaje>');
handler.command = ['respuesta', 'responder']
handler.register = true;
handler.private = true;

export default handler;