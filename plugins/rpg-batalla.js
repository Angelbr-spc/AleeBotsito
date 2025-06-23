let handler = async (m, { conn, text, usedPrefix }) => {
    let users = global.db.data.users;
    let sender = m.sender;
    let opponent = m.mentionedJid[0];

    if (!opponent) return m.reply(`🚩 Menciona a un jugador para iniciar una batalla.\nEjemplo: *${usedPrefix}batalla @usuario*`);
    if (!(opponent in users)) return m.reply("🚩 𝐄𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚𝐝𝐨 𝐧𝐨 𝐞𝐬𝐭á 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨.");
    if (opponent === sender) return m.reply("🚩 𝐍𝐨 𝐩𝐮𝐞𝐝𝐞𝐬 𝐥𝐮𝐜𝐡𝐚𝐫 𝐜𝐨𝐧𝐭𝐫𝐚 𝐭𝐢 𝐦𝐢𝐬𝐦𝐨.");

    let player = users[sender];
    let enemy = users[opponent];

    if (!player.mascota) return m.reply("🚩 𝐍𝐨 𝐭𝐢𝐞𝐧𝐞𝐬 𝐮𝐧𝐚 𝐦𝐚𝐬𝐜𝐨𝐭𝐚. 𝐔𝐬𝐚 *.𝐦𝐢𝐦𝐚𝐬𝐜𝐨𝐭𝐚* 𝐩𝐚𝐫𝐚 𝐚𝐝𝐨𝐩𝐭𝐚𝐫 𝐮𝐧𝐚.");
    if (!enemy.mascota) return m.reply("🚩 𝐓𝐮 𝐨𝐩𝐨𝐧𝐞𝐧𝐭𝐞 𝐧𝐨 𝐭𝐢𝐞𝐧𝐞 𝐮𝐧𝐚 𝐦𝐚𝐬𝐜𝐨𝐭𝐚.");

    if (player.vidaMascota <= 0) return m.reply("🚩 𝐓𝐮 𝐦𝐚𝐬𝐜𝐨𝐭𝐚 𝐞𝐬𝐭á 𝐦𝐮𝐞𝐫𝐭𝐚. 𝐔𝐬𝐚 *.𝐫𝐞𝐯𝐢𝐯𝐢𝐫𝐦𝐚𝐬𝐜𝐨𝐭𝐚* 𝐩𝐚𝐫𝐚 𝐫𝐞𝐯𝐢𝐯𝐢𝐫𝐥𝐚.");
    if (enemy.vidaMascota <= 0) return m.reply("🚩 𝐋𝐚 𝐦𝐚𝐬𝐜𝐨𝐭𝐚 𝐝𝐞 𝐭𝐮 𝐨𝐩𝐨𝐧𝐞𝐧𝐭𝐞 𝐞𝐬𝐭á 𝐦𝐮𝐞𝐫𝐭𝐚.");

    // Batalla aleatoria
    let resultado = Math.random() < 0.5 ? "gana" : "pierde";
    let ganador, perdedor;

    if (resultado === "gana") {
        ganador = player;
        perdedor = enemy;
    } else {
        ganador = enemy;
        perdedor = player;
    }

    // Daño a las mascotas
    let dañoGanador = 10;
    let dañoPerdedor = 20;

    ganador.vidaMascota -= dañoGanador;
    perdedor.vidaMascota -= dañoPerdedor;

    // Transferencia de XP y dulces
    let xpRobado = Math.min(perdedor.exp, 5000);
    let dulcesRobados = Math.min(perdedor.limit, 5000);

    ganador.exp += xpRobado;
    ganador.limit += dulcesRobados;

    perdedor.exp -= xpRobado;
    perdedor.limit -= dulcesRobados;

    // Si la mascota muere
    if (perdedor.vidaMascota <= 0) {
        perdedor.vidaMascota = 0;
        m.reply(`💀 *¡Batalla terminada!*  
🏆 *Ganador:* @${ganador.jid.split('@')[0]}  
💔 *Perdedor:* @${perdedor.jid.split('@')[0]}  
⚰ *La mascota de @${perdedor.jid.split('@')[0]} ha muerto.* 😭  
🎁 *Recompensa para el ganador:* +${xpRobado} XP, +${dulcesRobados} 🍬 Dulces`, null, { mentions: [sender, opponent] });
    } else {
        m.reply(`⚔ *¡Batalla terminada!*  
🏆 *Ganador:* @${ganador.jid.split('@')[0]}  
💔 *Perdedor:* @${perdedor.jid.split('@')[0]}  
❤️ *Vida restante de ${ganador.mascota}:* ${ganador.vidaMascota}/100  
💔 *Vida restante de ${perdedor.mascota}:* ${perdedor.vidaMascota}/100  
🎁 *Recompensa para el ganador:* +${xpRobado} XP, +${dulcesRobados} 🍬 Dulces`, null, { mentions: [sender, opponent] });
    }
};

handler.help = ['batalla @usuario'];
handler.tags = ['rpg'];
handler.command = ['batalla'];

export default handler;