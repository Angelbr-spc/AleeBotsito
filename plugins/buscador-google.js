/* Imagen Search By WillZek 
- Free Codes Titan 
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/

import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {

if (!text) return m.reply('🍭 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐔𝐧 𝐓𝐞𝐱𝐭𝐨 𝐏𝐚𝐫𝐚 𝐁𝐮𝐬𝐜𝐚𝐫 𝐔𝐧𝐚 𝐈𝐦𝐚𝐠𝐞𝐧');

try {
let api = `https://api.dorratz.com/v3/ai-image?prompt=${text}`;
let response = await fetch(api);
let json = await response.json();
let res = json.data;

m.react('🕑');
let txt = `> *Resultado De: ${text}*`;
let img = res.image_link;
let link = img;

await conn.sendMessage(m.chat, { image: { url: link }, caption: txt }, {quoted: fkontak});   
m.react('✅');

} catch (e) {
m.reply(`Error: ${e.message}`);
m.react('✖️');
 }
}

handler.command = ['imagen', 'image'];

export default handler;