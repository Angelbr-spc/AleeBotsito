
import { File } from "megajs";
import path from "path";

const botName = 'Descarga de MEGA';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        if (!text) return conn.reply(m.chat, `\`\`\`[ 💨 ] Uso correcto del comando:\`\`\` ${usedPrefix + command} https://mega.nz/file/ovJTHaQZ#yAbkrvQgykcH_NDKQ8eIc0zvsN7jonBbHZ_HTQL6lZ8`, null);

        const file = File.fromURL(text);
        await file.loadAttributes();

        if (file.size >= 300000000) return m.reply('𝐄𝐫𝐫𝐨𝐫: 𝐄𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 𝐞𝐬 𝐝𝐞𝐦𝐚𝐬𝐢𝐚𝐝𝐨 𝐩𝐞𝐬𝐚𝐝𝐨 (𝐏𝐞𝐬𝐨 𝐦á𝐱𝐢𝐦𝐨: 300𝐌𝐁 (𝐏𝐫𝐞𝐦𝐢𝐮𝐦: 800𝐌𝐁))');

        // Reemplazamos rwait con una reacción válida, como una marca de verificación
        m.react('✅'); // Puedes personalizar el emoji según prefieras

        const caption = `   *--- ${botName} ---*\nFile: ${file.name}\nSize: ${formatBytes(file.size)}\n> ৎ୭࠭͢𝐁𝐨𝐭 𝐀𝐥𝐞𝐞𝐁𝐨𝐭 👑 Súper Bot𓆪͟͞ `;

        const data = await file.downloadBuffer();

        const fileExtension = path.extname(file.name).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };

        let mimetype = mimeTypes[fileExtension] || "application/octet-stream";

        await conn.sendFile(m.chat, data, file.name, caption, m, null, { mimetype, asDocument: true });

    } catch (error) {
        return m.reply(`Error: ${error.message}`);
    }
};

handler.help = ["mega"];
handler.tags = ["descargas"];
handler.command = /^(mega)$/i;

export default handler;

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}