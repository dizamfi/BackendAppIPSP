const wss = require('../../../index');
const net = require('net');
const readline = require('readline');
const { arregloTagsSanFranscisco, arregloTagsSanFransciscoGeneral, arregloTagsSanFransciscoTCP, arregloTagsSanFransciscoAntenas } = require('../../../helpers/california/arregloTagsCalifornia');


let interval = null; 
let dataCache = {
    SanFranscisco: [],
    SanFransciscoGral: [],
    SanFransciscoTCP: [],
    SanFransciscoAntenas: []
}; 

let completedFuntions = 0
const clientSubscriptions = new Map()

const checkAllFuntionsComplete = () => {
    if (completedFuntions === 4) {
        broadcastData()
        completedFuntions = 0
    }
}

const broadcastData = () => {
    clientSubscriptions.forEach((isSubscribed, client) => {
        if (isSubscribed) {
            //console.log("Sending data: ", JSON.stringify(dataCache))
            client.send(JSON.stringify(dataCache));
        }
    })

}

const getEbSanFranscisco = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanFranscisco()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.SanFranscisco = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(3)] = ex.Value;     
                    });
                    dataCache.SanFranscisco.push(obje)
                    obje = {}
                    completedFuntions++
                    checkAllFuntionsComplete()
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEbSanFransciscoGral = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanFransciscoGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.SanFransciscoGral = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(3)] = ex.Value;     
                    });
                    dataCache.SanFransciscoGral.push(obje)
                    obje = {}
                    completedFuntions++
                    checkAllFuntionsComplete()
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEbSanFransciscoTCP = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanFransciscoTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.SanFransciscoTCP = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(3)] = ex.Value;     
                    });
                    dataCache.SanFransciscoTCP.push(obje)
                    obje = {}
                    completedFuntions++
                    checkAllFuntionsComplete()
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEbSanFransciscoAntenas = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanFransciscoAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.SanFransciscoAntenas = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(3)] = ex.Value;     
                    });
                    dataCache.SanFransciscoAntenas.push(obje)
                    obje = {}
                    completedFuntions++
                    checkAllFuntionsComplete()
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
    getEbSanFranscisco(),
    getEbSanFransciscoGral(),
    getEbSanFransciscoTCP(),
    getEbSanFransciscoAntenas()
}

const handleSubscriptionSF = (ws, message) => {
    if (message.toString() === 'subscribeSF'){
        console.log('Cliente suscrito')
        console.log('aquii')
        clientSubscriptions.set(ws, true);

        if (!interval) {
            interval = setInterval(executeAllFuntions, 2000); 
        }
    } else if (message.toString() === 'unsubscribeSF'){
        clientSubscriptions.set(ws, false);
        console.log('Cliente desuscrito')
    }
}

module.exports = { handleSubscriptionSF }


// Manejar la conexión de nuevos clientes WebSocket
/* wss.on('connection', (ws) => {
    clientSubscriptions.set(ws, false)
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`)
        const subscriptionStatus = clientSubscriptions.get(ws);
        if (message.toString() === 'subscribeSF' && !subscriptionStatus){
            console.log('Cliente suscrito')
            console.log('aquii')
            clientSubscriptions.set(ws, true);

            if (!interval) {
                interval = setInterval(executeAllFuntions, 2000); 
            }
        } else if (message.toString() === 'unsubscribeSF' && subscriptionStatus){
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
});
 */