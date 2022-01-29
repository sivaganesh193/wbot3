const qrcode = require('qrcode-terminal');
const { Client,MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const { M } = require('qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel');
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

client.on('message_create', async (msg) => {
    
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

    switch(msg.body.toLowerCase()) {

        case 'sivaganesh': {

            const qm = await msg.getQuotedMessage();
            const replyString = 'eww';
            qm ? await qm.reply(replyString) : await msg.reply(replyString);
            break;
        }

        case '!yourmom': {

            const qm = await msg.getQuotedMessage();
            const replyString = 'your dad';
            qm ? await qm.reply(replyString) : await msg.reply(replyString);
            break;
        }

        case '!sivassri': {

            const qm = await msg.getQuotedMessage();
            const replyString = '😂😂';
            qm ? await qm.reply(replyString) : await msg.reply(replyString);
            break;
        }

        case 'anything imp': {

            const qm = await msg.getQuotedMessage();
            const replyString = 'Saroja';
            qm ? await qm.reply(replyString) : await msg.reply(replyString);
            break;
        }

        case '!tt': {

            const media = MessageMedia.fromFilePath('ttimg.jpg');
            const qm = await msg.getQuotedMessage();
            qm ? await qm.reply(media) : await msg.reply(media);
            break;
        }

        case 'arshad': {

            const qm = await msg.getQuotedMessage();
            const replyString = 'If you are gay Arshad is your bae';
            qm ? await qm.reply(replyString) : await msg.reply(replyString);
            break;
        }
    }
});

client.initialize();

