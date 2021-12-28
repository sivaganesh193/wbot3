const qrcode = require('qrcode-terminal');
const { Client,MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const SESSION_FILE_PATH = './session.json';
let sessionData;

if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}
const client = new Client({
    session: sessionData
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('message', async (msg) => {
    if(msg.from === '919940558752-1562156168@g.us' || msg.from === '120363021301172938@g.us') {
        console.log(msg.from, msg.body);
        if(msg.body === '!everyone') {
            const chat = await msg.getChat();
            let text = "";
            let mentions = [];

            for(let participant of chat.participants) {
                const contact = await client.getContactById(participant.id._serialized);
                
                mentions.push(contact);
                text += `@${participant.id.user} `;
            }
            await chat.sendMessage(text, { mentions });
        }
        if(msg.body === 'sivaganesh') {
            const chat = await msg.getChat();
            await chat.sendMessage('hi');
        }
        if(msg.body === '!yourmom') {
            const chat = await msg.getChat();
            await chat.sendMessage('Arshu is gay!');
        }
        if(msg.body === '!sivassri') {
            const chat = await msg.getChat();
            await chat.sendMessage('😂😂');
        }
        if(msg.body.toLowerCase().includes('anything imp')) {
            await msg.reply('Saroja');
        }
        if(msg.body === '!tt') {
            const media = MessageMedia.fromFilePath('ttimg.jpg');
            await msg.reply(media);
        }
        if(msg.body === '!arshad'){
            const chat = await msg.getChat();
            await chat.sendMessage('If you are gay Arshad is your bae');
        }
    }
    if(msg.from === '120363040090543612@g.us') {
        await msg.reply('Bot Test msg');
    }
});

client.initialize();

