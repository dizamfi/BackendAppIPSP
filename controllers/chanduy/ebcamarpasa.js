const wss = require('../../index');
const net = require('net');
const readline = require('readline');
const { arregloTagsCamarpasa, arregloTagsCamarpasaGeneral, arregloTagsCamarpasaTCP, arregloTagsCamarpasaAntenas } = require('../../helpers/chanduy/arregloTags');

let interval = null; 
let dataCache = {
    Camarpasa: [],
    CamarpasaGral: [],
    CamarpasaTCP: [],
    CamarpasaAntenas: []
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

const getEbCamarpasa = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCamarpasa()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.Camarpasa = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(4)] = ex.Value;     
                    });
                    dataCache.Camarpasa.push(obje)
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

const getEbCamarpasaGral = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCamarpasaGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.CamarpasaGral = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(4)] = ex.Value;     
                    });
                    dataCache.CamarpasaGral.push(obje)
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

const getEbCamarpasaTCP = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCamarpasaTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.CamarpasaTCP = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(4)] = ex.Value;     
                    });
                    dataCache.CamarpasaTCP.push(obje)
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

const getEbCamarpasaAntenas = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCamarpasaAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
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
                    dataCache.CamarpasaAntenas = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(8)] = ex.Value;     
                    });
                    dataCache.CamarpasaAntenas.push(obje)
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
    getEbCamarpasa(),
    getEbCamarpasaGral(),
    getEbCamarpasaTCP(),
    getEbCamarpasaAntenas()
}

const handleSubscriptionCMP = (ws, message) => {
    if (message.toString() === 'subscribeCMP'){
        console.log('Cliente suscrito')
        console.log('aquii')
        clientSubscriptions.set(ws, true);

        if (!interval) {
            interval = setInterval(executeAllFuntions, 2000); 
        }
    } else if (message.toString() === 'unsubscribeCMP'){
        clientSubscriptions.set(ws, false);
        console.log('Cliente desuscrito')
    }
}


module.exports = { handleSubscriptionCMP }


// Manejar la conexión de nuevos clientes WebSocket
/* wss.on('connection', (ws) => {
    clientSubscriptions.set(ws, false)
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`)
        if (message.toString() === 'subscribeCMP'){
            console.log('Cliente suscrito')
            console.log('aquii')
            clientSubscriptions.set(ws, true);

            if (!interval) {
                interval = setInterval(executeAllFuntions, 2000); 
            }
        } else if (message.toString() === 'unsubscribeCMP'){
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