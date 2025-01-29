const { WebcastPushConnection } = require('tiktok-live-connector');

let tiktokUserName = "holasoymalva"; // 👈 Change this

let tiktokLiveConnection = new WebcastPushConnection(tiktokUserName, {
    enableExtendedGiftInfo: true,
    enableWebsocketUpgrade: true,
    requestPollingIntervalMs: 2000,
});

async function connectToLive() {
    try {
        await tiktokLiveConnection.connect();
        console.log(`Conectado exitosamente al live de: ${tiktokUserName}`);
        setupEventListeners(tiktokLiveConnection);
    } catch (err) {
        console.error('Error de conexión:', err.message);
        if (err.message.includes('status')) {
            console.log('El usuario podría no estar transmitiendo en vivo en este momento');
        }
    }
}

function setupEventListeners(connection) {
    connection.on('gift', data => {
        if (data.giftType === 1 && !data.repeatEnd) {
            console.log(`${data.nickname} muchas gracias por esos regalos!!! 🦸`);
        } else {
            console.log(`${data.nickname} muchas gracias por tus regalos!! 🦸🎁 `);
        }
    });

    connection.on('member', data => {
        console.log(`👁️👄👁️ ${data.nickname} hola `);
    });

    connection.on('chat', data => {
        console.log(`💬 ${data.nickname} dice : ${data.comment} `);
    });

    connection.on("like", (data) => {
        console.log(`🫰❤️‍🩹 ${data.nickname} muchas gracias por tus likes 👩‍🚀😸`);
    });

    connection.on('follow', (data) => {
        console.log(`⭐ ${data.nickname} ⭐ gracias por tu follow!!! 🦄✨`);
    });

    connection.on('share', data => {
        console.log(`🔄 ${data.nickname} compartió el stream! Muchas gracias!`);
    });

    connection.on('subscribe', data => {
        console.log(`⭐ ${data.nickname} se suscribió al canal!`);
    });

    connection.on('rankingUpdate', data => {
        console.log(`🏆 Actualización del ranking: ${JSON.stringify(data)}`);
    });
    
    connection.on('disconnect', () => {
        console.log('⚠️ Desconectado del stream. Intentando reconectar...');
    });

    connection.on('socketClose', () => {
        console.log('🔒 Conexión cerrada por el servidor');
    });

    connection.on('streamEnd', () => {
        console.log('🔴 El stream ha terminado');
    });
}
connectToLive();
