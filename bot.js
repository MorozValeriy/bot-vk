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

const users = new Map();
users.set('323603582', 'Валера');
users.set('173388679', 'Саня');
users.set('171042879', 'Влад');
users.set('146977396', 'Левик');

votingMassive = [];
votingMassive.push('323603582');
votingMassive.push('173388679');
votingMassive.push('171042879');
votingMassive.push('146977396');

isVotingExist = false;

votingMap = new Map();

name = null;
socpoints = null;

bot.hear(/статистика/i, msg => {
    msg.send('Саня' + ': ' + socpointMap.get('Саня') + ' соцпоинтов');
    msg.send('Влад' + ': ' + socpointMap.get('Влад') + ' соцпоинтов');
    msg.send('Левик' + ': ' + socpointMap.get('Левик') + ' соцпоинтов');
    msg.send('Валера' + ': ' + socpointMap.get('Валера') + ' соцпоинтов');
})

bot.hear(/!голосование/i, msg => {
    if (isVotingExist) {
        const arr = Array.from(users.keys());
        arr.forEach(item => {
            result = null;
            if (votingMap.get(parseInt(item)) !== null) {
                result = 'голосовал';
            } else {
                result = 'не голосовал';
            }
            msg.send(users.get(item) + ': ' + result);
        })
    } else {
        msg.send('Голосования не существует');
    }
})

bot.hear(/виновен/i, msg11 => {
    if (isVotingExist) {
        count1 = 0;
        trueCount = 0;
        falseCount = 1;
        endVote = false;
        if (votingMap.get(msg11.senderId) === null) {
            if (msg11.text === 'Виновен' || msg11.text === 'виновен') {
                votingMap.set(msg11.senderId, true);
            } else if (msg11.text === 'Не виновен' && msg11.text === 'не виновен') {
                votingMap.set(msg11.senderId, false);
            }
        } else {
            msg11.send('Вы уже голосовали');
        }
        const arr = Array.from(votingMap.values());
        arr.forEach(item => {
            if (item !== null) {
                count1++;
            }
        })
        if (count1 === 3) {
            const arrRes = Array.from(votingMap.values());
            arrRes.forEach(item => {
                if (item === true) {
                    trueCount++;
                } else {
                    falseCount++;
                }
            })
            if (trueCount > falseCount) {
                minusSocpoint(name, socpoints);
                msg11.send('Приговор: виновен');
            } else {
                msg11.send('Оправдан');
            }
            trueCount = 0;
            falseCount = 0;
           count1 = 0;
           isVotingExist = false;
           votingMap.clear();
        }
    }
})


bot.hear(/соцпоинт/i, msg => {
    if (!isVotingExist) {
        socpointsList = msg.text.split(' ');
        isVotingExist = true;

        if (msg.text.includes('Сане')) {
            name = 'Саня';
            socpoints = socpointsList[0];
            filtered = votingMassive.filter(function(value, index, arr){
                return value !== '173388679';
            });

            filtered.forEach(item => {
                msg.send(users.get(item) + ', ваш вердикт');
                votingMap.set(parseInt(item), null);
            })
        }
        if (msg.text.includes('Владу')) {
            name = 'Влад';
            socpoints = socpointsList[0];

            filtered = votingMassive.filter(function(value, index, arr){
                return value !== '171042879';
            });

            filtered.forEach(item => {
                msg.send(users.get(item) + ', ваш вердикт');
                votingMap.set(parseInt(item), null);
            })
        }
        if (msg.text.includes('Левику')) {
            name = 'Левик';
            socpoints = socpointsList[0];

            filtered = votingMassive.filter(function(value, index, arr){
                return value !== '146977396';
            });

            filtered.forEach(item => {
                msg.send(users.get(item) + ', ваш вердикт');
                votingMap.set(parseInt(item), null);
            })
        }
        if (msg.text.includes('Валере')) {
            name = 'Валера';
            socpoints = socpointsList[0];

            filtered = votingMassive.filter(function(value, index, arr){
                return value !== '323603582';
            });

            filtered.forEach(item => {
                msg.send(users.get(item) + ', ваш вердикт');
                votingMap.set(parseInt(item), null);
            })
        }
    } else {
        msg.send('Идет голосование');
    }
})

function minusSocpoint(name, socpoints) {
    if (parseInt(socpoints)) {
        socpointMap.set(name, socpointMap.get(name) + parseInt(socpoints));
    }
}

app.listen(process.env.PORT || 5000 ,function(){
    console.log("up and running on port "+process.env.PORT);
});

setInterval(() => {
    https.get("https://bot-vk-xi.herokuapp.com", (res) => {})
}, 20 * 60 * 1000)

console.log('Бот запущен');
vk.updates.start().catch(console.error)

