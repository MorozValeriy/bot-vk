const { VK } = require('vk-io')
const  { HearManager } = require('@vk-io/hear')
const express = require('express');
const app = express();

const vk = new VK({
    token: 'e9a0f2123ef150e8ded81a3073520e045931c3c4d4ac55794c67085e874ad9cd3cace2e4f958a6127d47e'
})

const bot = new HearManager()
let count = 0;

vk.updates.on('message_new', bot.middleware)

bot.hear('привет', msg => {
    msg.send('левик пидор')
})

bot.hear('пидарас', msg => {
    msg.send('что?')
})

count = 1;
let messages = [];

bot.onFallback(msg => {
    messages.push(msg.text);

    if (count === Math.floor(Math.random() * 3)) {
        msg.send(random(messages.length - 1));
    }
})

function random(max){
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