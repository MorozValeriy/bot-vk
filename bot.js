const { VK } = require('vk-io')
const  { HearManager } = require('@vk-io/hear')
const express = require('express');
const https = require('https');
const app = express();

const vk = new VK({
    token: '5a9ea9fa2f32bf789c30ddfce9a38697067423c97c68c21fd8f3a6d60a946f220af3b3b5c505b79215cc4'
})

const bot = new HearManager()

vk.updates.on('message_new', bot.middleware)

const socpointMap = new Map();
socpointMap.set('Саня', 100);
socpointMap.set('Влад', 100);
socpointMap.set('Левик', 100);
socpointMap.set('Валера', 100);



bot.hear(/статистика/i, msg => {
    msg.send('Саня' + ': ' + socpointMap.get('Саня') + ' соцпоинтов');
    msg.send('Влад' + ': ' + socpointMap.get('Влад') + ' соцпоинтов');
    msg.send('Левик' + ': ' + socpointMap.get('Левик') + ' соцпоинтов');
    msg.send('Валера' + ': ' + socpointMap.get('Валера') + ' соцпоинтов');

})
bot.hear(/соцпоинт/i, msg => {
    if (msg.text.includes('-')) {
        socpoints = msg.text.charAt(1) + msg.text.charAt(2);
        if (msg.text.includes('Сане')) {
            minusSocpoint('Саня', socpoints, false);
            msg.send('Саня' + ': ' + socpointMap.get('Саня') + ' соцпоинтов');
        }
        if (msg.text.includes('Владу')) {
            minusSocpoint('Влад', socpoints, false);
            msg.send('Влад' + ': ' + socpointMap.get('Влад') + ' соцпоинтов');
        }
        if (msg.text.includes('Левику')) {
            minusSocpoint('Левик', socpoints, false);
            msg.send('Левик' + ': ' + socpointMap.get('Левик') + ' соцпоинтов');
        }
        if (msg.text.includes('Валере')) {
            minusSocpoint('Валера', socpoints, false);
            msg.send('Валера' + ': ' + socpointMap.get('Валера') + ' соцпоинтов');
        }
    } else if (msg.text.includes('+')) {
        socpoints = msg.text.charAt(1) + msg.text.charAt(2);
        if (msg.text.includes('Сане')) {
            minusSocpoint('Саня', socpoints, true);
            msg.send('Саня' + ': ' + socpointMap.get('Саня') + ' соцпоинтов');
        }
        if (msg.text.includes('Владу')) {
            minusSocpoint('Влад', socpoints, true);
            msg.send('Влад' + ': ' + socpointMap.get('Влад') + ' соцпоинтов');
        }
        if (msg.text.includes('Левику')) {
            minusSocpoint('Левик', socpoints, true);
            msg.send('Левик' + ': ' + socpointMap.get('Левик') + ' соцпоинтов');
        }
        if (msg.text.includes('Валере')) {
            minusSocpoint('Валера', socpoints, true);
            msg.send('Валера' + ': ' + socpointMap.get('Валера') + ' соцпоинтов');
        }
    }

})

function minusSocpoint(name, socpoints, plus) {
    if (plus) {
        socpointMap.set(name, socpointMap.get(name) + socpoints)
    } else {
        socpointMap.set(name, socpointMap.get(name) - socpoints)
    }
}


app.listen(process.env.PORT || 5000 ,function(){
    console.log("up and running on port "+process.env.PORT);
});

setInterval(() => {
    https.get("https://aaalllllllll.herokuapp.com", (res) => {})
}, 20 * 60 * 1000)

console.log('Бот запущен');
vk.updates.start().catch(console.error)

