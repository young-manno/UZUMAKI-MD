const { Client, LocalAuth } = require('whatsapp-web.js');
const Dorkerfile = require('dorkerfile');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    // Générer le code QR à scanner avec votre téléphone
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    console.log(`Message received from ${msg.from}: ${msg.body}`);

    if (msg.body === '!ping') {
        msg.reply('pong');
    } else if (msg.body.startsWith('!dork ')) {
        const query = msg.body.slice(6);
        const dorkerfile = new Dorkerfile();
        try {
            const results = await dorkerfile.search(query);
            msg.reply(`Results for "${query}":\n${results.join('\n')}`);
        } catch (error) {
            msg.reply('An error occurred while searching.');
        }
    }
});

client.initialize();
