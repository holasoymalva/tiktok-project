const { WebcastPushConnection } = require('tiktok-live-connector');
let tiktokUserName = "holasoymalva"; // 👈 Change this
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

tiktokLiveConnection.connect().then(state => {

}).catch(err => {
    console.error('Failed to connect', err);
})

tiktokLiveConnection.on('gift', data => {
    if (data.giftType === 1 && !data.repeatEnd) {
        console.log(`${data.nickname} muchas gracias!! 🦸`);
    } else {
        console.log(`${data.nickname} muchas gracias por tu regalo!! 🦸🎁 `);
    }
})

tiktokLiveConnection.on('like', data => {
    console.log(`${data.nickname} muchas gracias por tus likes 👩‍🚀😸`);
})

tiktokLiveConnection.on('follow', (data) => {
    console.log(data.nickname, "gracias por tu follow!!! 🦄✨");
})

