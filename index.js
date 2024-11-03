const { WAConnection, MessageType } = require('@adiwajshing/baileys');

const startBot = async () => {
    const conn = new WAConnection();
    conn.on('qr', (qr) => {
        console.log('Scan this QR code: ', qr);
    });

    conn.on('open', () => {
        console.log('Bot is connected!');
    });

    await conn.connect();
    
    // Listening for incoming messages
    conn.on('chat-update', async (chatUpdate) => {
        if (!chatUpdate.hasNewMessage) return;
        const message = chatUpdate.messages.all()[0];
        const from = message.key.remoteJid;

        if (message.message) {
            const msgContent = message.message.conversation;

            // Example command handling
            if (msgContent === '!ping') {
                await conn.sendMessage(from, 'Pong!', MessageType.text);
            } else if (msgContent === '!hello') {
                await conn.sendMessage(from, 'Hello! How can I help you today?', MessageType.text);
            }
        }
    });
};

startBot().catch((error) => console.error('Error starting the bot: ', error));
