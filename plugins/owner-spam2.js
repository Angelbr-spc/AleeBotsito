const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const args = text.split('|').map(v => v.trim());

  if (args.length < 3) {
    return m.reply(`☁️ Debes ingresar el link del grupo, el mensaje y la cantidad de spam separados por "|".*\n\nEjemplo:\n${usedPrefix + command} https://chat.whatsapp.com/SSSS | Hola, ¿cómo están? | 5`);
  }

  const [groupLink, message, countStr] = args;
  const count = parseInt(countStr, 10);

  if (!groupLink.includes('chat.whatsapp.com')) {
    return m.reply('*🙌 𝐏𝐫𝐨𝐩𝐨𝐫𝐜𝐢𝐨𝐧𝐞 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 𝐯á𝐥𝐢𝐝𝐨 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*');
  }
  if (isNaN(count) || count <= 0) {
    return m.reply('*🐉 𝐄𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐪𝐮𝐞 𝐮𝐧𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐯á𝐥𝐢𝐝𝐚 𝐝𝐞 𝐦𝐞𝐧𝐬𝐚𝐣𝐞𝐬 (𝐦𝐚𝐲𝐨𝐫 𝐚 0).*');
  }

  try {
    const code = groupLink.split('chat.whatsapp.com/')[1];
    const groupId = await conn.groupAcceptInvite(code);

    m.reply(`✅ Unido al grupo con éxito. Iniciando spam de ${count} mensajes...`);

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(groupId, { text: message });
      await delay(1000); 
    }

    m.reply(`✅ Spam completado. Saliendo del grupo...`);
    await conn.groupLeave(groupId);
  } catch (error) {
    console.error(error);
    m.reply(`⚠️ Error al intentar realizar la operación: ${error.message}`);
  }
};

handler.help = ['spam2'];
handler.tags = ['owner'];
handler.command = ['spam2'];
handler.owner = true;
export default handler;