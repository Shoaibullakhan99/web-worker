import { WebSocketServer } from 'ws';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(ws){
    console.log('Connection established')
    ws.on('message', function message(data) {
        const rcvData = JSON.parse(data.toString());
        if(rcvData.socketStatus) {
            let counter = 0;
            setInterval(() => {
                counter = getRandomIntInclusive(1, 15);
                ws.send(counter);
            }, 1500);
        } 
    });
});

