//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('*[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.*\𝐧> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .𝐞𝐧𝐚𝐛𝐥𝐞 𝐧𝐬𝐟𝐰');
    }
    // Verificamos si se menciona a alguien o se cita un mensaje
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0]; // Si hay mención, usamos esa
    } else if (m.quoted) {
        who = m.quoted.sender; // Si se cita un mensaje, usamos el emisor de ese mensaje
    } else {
        who = m.sender; // En caso contrario, usamos el emisor
    }

    let name = conn.getName(who); // Nombre de la persona mencionada o del emisor
    let name2 = conn.getName(m.sender); // Nombre del usuario que envía el comando
    m.react('😏');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *está manoseando a* \`${name || who}\` *estas muy excitante hoy.*`;
    } else if (m.quoted) {
        str = `\`${name2}\` *está manoseando a* \`${name || who}\` *estás muy sensual hoy.`;
    } else {
        str = `\`${name2}\` *está manoseando! >.<*`.trim();
    }

    if (m.isGroup) {
        let pp = 'https://qu.ax/RdBAy.mp4'; 
        let pp2 = 'https://qu.ax/DolnW.mp4'; 
        let pp3 = 'https://qu.ax/OydCh.mp4';
        let pp4 = 'https://qu.ax/CDrZm.mp4';
        let pp5 = 'https://qu.ax/BRmBk.mp4';
        let pp6 = 'https://qu.ax/AFzqg.mp4';

        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['grop/manosear @tag'];
handler.tags = ['emox'];
handler.command = ['grop', 'grope', 'manosear'];
handler.group = true;

export default handler;