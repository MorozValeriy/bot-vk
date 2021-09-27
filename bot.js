const { VK } = require('vk-io')
const  { HearManager } = require('@vk-io/hear')
const express = require('express');
const app = express();

const vk = new VK({
    token: 'e9a0f2123ef150e8ded81a3073520e045931c3c4d4ac55794c67085e874ad9cd3cace2e4f958a6127d47e'
})

const bot = new HearManager()

vk.updates.on('message_new', bot.middleware)
randomCount = 4;

bot.hear(/привет/i, msg => {
    msg.send('вас никто не слышит')
})

bot.hear(/пидарас/i, msg => {
    msg.send('что?')
})

bot.hear(/!command random/i, msg => {
    randomCount = msg.text.toString().substring(16, 17);
    msg.send('Шанс изменен');
})

const messagesMap = new Map();

bot.onFallback(msg => {
    if (msg.text !== undefined) {
        if (!messagesMap.has(msg.peerId)) {
            let mess = [msg.text];
            messagesMap.set(msg.peerId, mess);
        } else {
            messagesMap.get(msg.peerId).push(msg.text);
        }
    }

        let messag = messagesMap.get(msg.peerId)
        if (randomCount > 1) {
            if (1 === Math.floor(Math.random() * randomCount)) {
                if (messag.length > 1) {
                    msg.send(random((messag.length - 1), messag));
                }
            }
        } else if (randomCount == 1) {

            if (messag.length > 1) {
                msg.send(random((messag.length - 1), messag));
            }

        }
})

function random(max, messages){
    let string = '';
    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
        string = string + ' ' + messages[Math.floor(Math.random() * max)];
    }
    if (string.length === 0) {
        string = messages[Math.floor(Math.random() * max)];
    }
    return string;
}

app.listen(process.env.PORT || 5000 ,function(){
    console.log("up and running on port "+process.env.PORT);
});

console.log('Бот запущен');
vk.updates.start().catch(console.error)

