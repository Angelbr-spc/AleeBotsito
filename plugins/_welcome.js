import { WAMessageStubType } from "@whiskeysockets/baileys"
import fetch from "node-fetch"

export async function before(m, { conn, participants, groupMetadata }) {
  try {
    if (!m.messageStubType || !m.isGroup) return true;

    let chat = global.db?.data?.chats?.[m.chat];
    if (!chat || !chat.bienvenida) return true;

    const botName = "🔥 𝐀𝐧𝐠𝐞𝐥 Bot 🔥";
    const user = `@${m.messageStubParameters[0].split("@")[0]}`;
    const groupName = groupMetadata.subject;
    const groupDesc = groupMetadata.desc || "🌎 Sin descripción";

    let ppUrl = await conn.profilePictureUrl(m.messageStubParameters[0], "image").catch(
      () => "https://qu.ax/JRCMQ.jpg"
    );
    let imgBuffer = await fetch(ppUrl).then(res => res.buffer()).catch(() => null);

    let text;

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      text = chat.sWelcome || `🎊 *¡Bienvenido, ${user}!* 🎊\n✨ *Has entrado a* ${groupName}.\n📢 *Descripción:* ${groupDesc}`;
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      text = chat.sBye || `👋 *${user} ha salido del grupo.*\n✨ *Esperamos verte nuevamente en* ${groupName}`;
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      text = chat.sKick || `🚨 *${user} ha sido expulsado del grupo!* 🚨\n❌ *Eliminado de* ${groupName}`;
    }

    if (!text) return true;

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: text,
      mentions: [m.messageStubParameters[0]]
    });

  } catch (e) {
    console.error("❌ Error en bienvenida/despedida:", e);
  }
}