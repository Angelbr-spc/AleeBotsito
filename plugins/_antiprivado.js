export async function before(m, { conn, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const botSettings = global.db.data.settings[this.user.jid] || {};

  if (botSettings.antiPrivate && !isOwner && !isROwner) {
    const mensaje = `
*Hola 👋, Soy AleeBot 🤖!*

• *Está Prohibido Escribirme Al Privado 🚫.*

Si Deseas *Adquirir AleeBot 🤖*, Mensualmente o Permanentemente lo puedes hacer al ✅:

https://wa.me/573206095607?text=.Adquirir

*También se hacen bots personalizados 🤖🖌️!*
`.trim();

    // Envía el mensaje sin vista previa
    await conn.sendMessage(m.chat, {
      text: mensaje,
      linkPreview: false
    });

    // Espera un par de segundos antes de bloquear (opcional)
    await conn.delay(1500);

    // Bloquea al usuario
    await conn.updateBlockStatus(m.chat, 'block');
    console.log(`Usuario ${m.sender} bloqueado por contacto privado.`);
  }

  return false;
}