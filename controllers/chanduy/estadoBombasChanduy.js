const wss = require('../../index');
const net = require('net');
const readline = require('readline');
const { arregloTagsEstadoBombasChanduy } = require('../../helpers/chanduy/arregloTags');

let interval = null; 
let dataCache = {
    EstadoBombasChanduy: [],
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

const getEbEstadoBombasChanduy = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsEstadoBombasChanduy()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.EstadoBombasChanduy = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name] = ex.Value;     
                    });
                    dataCache.EstadoBombasChanduy.push(obje)
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
    getEbEstadoBombasChanduy();
}

const handleSubscriptionStatusEBChanduy = (ws, message) => {
    if (message.toString() === 'subscribeStatusEBChanduy'){
        console.log('Cliente suscrito')
        console.log('aquii')
        clientSubscriptions.set(ws, true);

        if (!interval) {
            interval = setInterval(executeAllFuntions, 1000); 
        }
    } else if (message.toString() === 'unsubscribeStatusEBChanduy'){
        clientSubscriptions.set(ws, false);
        console.log('Cliente desuscrito')
    }
}


module.exports = { handleSubscriptionStatusEBChanduy }


// Manejar la conexión de nuevos clientes WebSocket
/* wss.on('connection', (ws) => {
    clientSubscriptions.set(ws, false)
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`)
        if (message.toString() === 'subscribeStatusEBChanduy'){
            console.log('Cliente suscrito')
            console.log('aquii')
            clientSubscriptions.set(ws, true);

            if (!interval) {
                interval = setInterval(executeAllFuntions, 1000); 
            }
        } else if (message.toString() === 'unsubscribeStatusEBChanduy'){
            clientSubscriptions.set(ws, false);
            console.log('Cliente desuscrito')
        }
        
    })

    ws.on('close', () => {
        clientSubscriptions.delete(ws);
        console.log('Cliente desconectado')
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
 */