const wss = require('../../../index');
const net = require('net');
const readline = require('readline');
const { arregloTagsSantaRosaB, arregloTagsSantaRosaBGeneral, arregloTagsSantaRosaBTCP, arregloTagsSantaRosaBAntenas } = require('../../../helpers/california/arregloTagsCalifornia');

let interval = null; 
let dataCache = {
    SantaRosaB: [],
    SantaRosaBGral: [],
    SantaRosaBTCP: [],
    SantaRosaBAntenas: []
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

const getEbSantaRosaB = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaB()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.SantaRosaB = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(15)] = ex.Value;     
                    });
                    dataCache.SantaRosaB.push(obje)
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

const getEbSantaRosaBGral = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaBGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.SantaRosaBGral = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(5)] = ex.Value;     
                    });
                    dataCache.SantaRosaBGral.push(obje)
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

const getEbSantaRosaBTCP = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaBTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.SantaRosaBTCP = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(11)] = ex.Value;     
                    });
                    dataCache.SantaRosaBTCP.push(obje)
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

const getEbSantaRosaBAntenas = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaBAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.SantaRosaBAntenas = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(8)] = ex.Value;     
                    });
                    dataCache.SantaRosaBAntenas.push(obje)
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
    getEbSantaRosaB(),
    getEbSantaRosaBGral(),
    getEbSantaRosaBTCP(),
    getEbSantaRosaBAntenas()
}


const handleSubscriptionSRB = (ws, message) => {
    if (message.toString() === 'subscribeSRB'){
        console.log('Cliente suscrito')
        console.log('aquii')
        clientSubscriptions.set(ws, true);

        if (!interval) {
            interval = setInterval(executeAllFuntions, 2000); 
        }
    } else if (message.toString() === 'unsubscribeSRB'){
        clientSubscriptions.set(ws, false);
        console.log('Cliente desuscrito')
    }
}


module.exports = { handleSubscriptionSRB }


// Manejar la conexión de nuevos clientes WebSocket
/* wss.on('connection', (ws) => {
    clientSubscriptions.set(ws, false)
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`)
        const subscriptionStatus = clientSubscriptions.get(ws);
        if (message.toString() === 'subscribeSRB' && !subscriptionStatus){
            console.log('Cliente suscrito')
            console.log('aquii')
            clientSubscriptions.set(ws, true);

            if (!interval) {
                interval = setInterval(executeAllFuntions, 2000); 
            }
        } else if (message.toString() === 'unsubscribeSRB' && subscriptionStatus){
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
