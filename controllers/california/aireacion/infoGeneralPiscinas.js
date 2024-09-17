const wss = require('../../../index');
const net = require('net');
const readline = require('readline');
const { arregloTagsPiscinasGeneral } = require('../../../helpers/california/arregloTagsAireacion');

let interval = null; 
let dataCache = {
    Piscinas: [],
}; 

const clientSubscriptions = new Map()

const broadcastData = () => {
    clientSubscriptions.forEach((isSubscribed, client) => {
        if (isSubscribed) {
            //console.log("Sending data: ", JSON.stringify(dataCache))
            client.send(JSON.stringify(dataCache));
        }
    })

}

const getPiscinasInfoGeneral = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPiscinasGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            let obje = {};
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    dataCache.Piscinas = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name] = ex.Value;     
                    });
                    dataCache.Piscinas.push(obje)
                    obje = {}
                    broadcastData()
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const executeAllFuntions = () => {
    getPiscinasInfoGeneral();
}

const handleSubscription = (ws, message) => {
    if (message.toString() === 'subscribeInfoGeneralPisCali'){
        console.log('Cliente suscrito')
        console.log('aquii')
        clientSubscriptions.set(ws, true);

        if (!interval) {
            interval = setInterval(executeAllFuntions, 1000); 
        }
    } else if (message.toString() === 'unsubscribeInfoGeneralPisCali'){
        clientSubscriptions.set(ws, false);
        console.log('Cliente desuscrito')
    }
}

module.exports = { handleSubscription }


// Manejar la conexión de nuevos clientes WebSocket
/* wss.on('connection', (ws) => {
    clientSubscriptions.set(ws, false)
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`)
        const subscriptionStatus = clientSubscriptions.get(ws);
        if (message.toString() === 'subscribeInfoGeneralPisCali' && !subscriptionStatus){
            console.log('Cliente suscrito')
            console.log('aquii')
            clientSubscriptions.set(ws, true);

            if (!interval) {
                interval = setInterval(executeAllFuntions, 1000); 
            }
        } else if (message.toString() === 'unsubscribeInfoGeneralPisCali' && subscriptionStatus){
            clientSubscriptions.set(ws, false);
            console.log('Cliente desuscrito')
        }
        
    })

    ws.on('close', () => {
        clientSubscriptions.delete(ws);
        console.log('Cliente desconectado')
        if ([...clientSubscriptions.values()].every(subscribed => !subscribed)) {
            clearInterval(interval)
            interval = null
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
}); */
