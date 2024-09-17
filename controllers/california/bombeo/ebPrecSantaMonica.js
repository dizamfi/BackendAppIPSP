const wss = require('../../../index');
const net = require('net');
const readline = require('readline');
const { arregloTagsPrecSantaMonica, arregloTagsPrecSantaMonicaGeneral, arregloTagsPrecSantaMonicaTCP, arregloTagsPrecSantaMonicaAntenas } = require('../../../helpers/california/arregloTagsCalifornia');

let interval = null; 
let dataCache = {
    PrecSantaMonica: [],
    PrecSantaMonicaGral: [],
    PrecSantaMonicaTCP: [],
    PrecSantaMonicaAntenas: []
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

const getEbPrecSantaMonica = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPrecSantaMonica()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.PrecSantaMonica = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(4)] = ex.Value;     
                    });
                    dataCache.PrecSantaMonica.push(obje)
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

const getEbPrecSantaMonicaGral = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPrecSantaMonicaGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.PrecSantaMonicaGral = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(4)] = ex.Value;     
                    });
                    dataCache.PrecSantaMonicaGral.push(obje)
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

const getEbPrecSantaMonicaTCP = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPrecSantaMonicaTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.PrecSantaMonicaTCP = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(4)] = ex.Value;     
                    });
                    dataCache.PrecSantaMonicaTCP.push(obje)
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

const getEbPrecSantaMonicaAntenas = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPrecSantaMonicaAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.PrecSantaMonicaAntenas = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(4)] = ex.Value;     
                    });
                    dataCache.PrecSantaMonicaAntenas.push(obje)
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
    getEbPrecSantaMonica(),
    getEbPrecSantaMonicaGral(),
    getEbPrecSantaMonicaTCP(),
    getEbPrecSantaMonicaAntenas()
}

const handleSubscriptionPSM = (ws, message) => {
    if (message.toString() === 'subscribePSM'){
        console.log('Cliente suscrito')
        console.log('aquii')
        clientSubscriptions.set(ws, true);

        if (!interval) {
            interval = setInterval(executeAllFuntions, 2000); 
        }
    } else if (message.toString() === 'unsubscribePSM'){
        clientSubscriptions.set(ws, false);
        console.log('Cliente desuscrito')
    }
}

module.exports = { handleSubscriptionPSM }


// Manejar la conexión de nuevos clientes WebSocket
/* wss.on('connection', (ws) => {
    clientSubscriptions.set(ws, false)
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`)
        const subscriptionStatus = clientSubscriptions.get(ws);
        if (message.toString() === 'subscribePSM' && !subscriptionStatus){
            console.log('Cliente suscrito')
            console.log('aquii')
            clientSubscriptions.set(ws, true);

            if (!interval) {
                interval = setInterval(executeAllFuntions, 2000); 
            }
        } else if (message.toString() === 'unsubscribePSM' && subscriptionStatus ){
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