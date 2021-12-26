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
    if(msg.from === '919842066955-1608209695@g.us' || msg.from === '919940558752-1562156168@g.us') {
        // console.log(msg.body);
    console.log(msg.from, msg.body);
        // if(msg.body === '!everyone') {
    //     const chat = await msg.getChat();
        
    //     let text = "";
    //     let mentions = [];

    //     for(let participant of chat.participants) {
    //         const contact = await client.getContactById(participant.id._serialized);
            
    //         mentions.push(contact);
    //         text += `@${participant.id.user} `;
    //     }

    //     await chat.sendMessage(text, { mentions });
    // }
    // if(msg.body === 'sivaganesh') {
    //     const chat = await msg.getChat();
    //     await chat.sendMessage('hi');
    // }
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
            const chat = await msg.getChat();
            const media = MessageMedia.fromFilePath('ttimg.jpg');
            await chat.sendMessage(media);
        }
    }
});

client.initialize();

