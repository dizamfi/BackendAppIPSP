const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { connectionDB } = require('./db/config');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const cors = require('cors');
const User = require('./models/User');
require('dotenv').config();

const piscontroler =  require('./controllers/california/aireacion/infoGeneralPiscinas');
const sDcontroler =  require('./controllers/california/bombeo/ebSanDiego');
const psmcontroler = require('./controllers/california/bombeo/ebPrecSantaMonica');
const sfcontroler = require('./controllers/california/bombeo/ebSanFranscisco');
const sbcontroler = require('./controllers/california/bombeo/ebSantaBarbara');
const smacontroler = require('./controllers/california/bombeo/ebSantaMonicaA');
const sracontroler = require('./controllers/california/bombeo/ebSantaRosaA');
const srbcontroler = require('./controllers/california/bombeo/ebSantaRosaB');
const statusEBCalicontroler = require('./controllers/california/bombeo/estadoBombasCalifornia');
const dpcontroler = require('./controllers/chanduy/depesca');
const eb1bcontroler = require('./controllers/chanduy/EB1b');
const apncontroler = require('./controllers/chanduy/ebapendice');
const cmpcontroler = require('./controllers/chanduy/ebcamarpasa');
const pnmcontroler = require('./controllers/chanduy/ebPanamao');
const statusEBChanduycontroler = require('./controllers/chanduy/estadoBombasChanduy');
const pc01controler = require('./controllers/california/aireacion/pc01');
const pc02controler = require('./controllers/california/aireacion/pc02');
const pc03controler = require('./controllers/california/aireacion/pc03');
const pc04controler = require('./controllers/california/aireacion/pc04');
const pc05controler = require('./controllers/california/aireacion/pc05');
const pc06controler = require('./controllers/california/aireacion/pc06');
const pc07controler = require('./controllers/california/aireacion/pc07');
const pc08controler = require('./controllers/california/aireacion/pc08');
const pc09controler = require('./controllers/california/aireacion/pc09');
const pc10controler = require('./controllers/california/aireacion/pc10');
const pc11controler = require('./controllers/california/aireacion/pc11');
const pc12controler = require('./controllers/california/aireacion/pc12');
const pc13controler = require('./controllers/california/aireacion/pc13');
const pc14controler = require('./controllers/california/aireacion/pc14');
const pc15controler = require('./controllers/california/aireacion/pc15');
const pc16controler = require('./controllers/california/aireacion/pc16');
const pc17controler = require('./controllers/california/aireacion/pc17');
const pc18controler = require('./controllers/california/aireacion/pc18');
const ps01controler = require('./controllers/california/aireacion/ps01');
const ps02controler = require('./controllers/california/aireacion/ps02');
const ps03controler = require('./controllers/california/aireacion/ps03');
const ps04controler = require('./controllers/california/aireacion/ps04');
const ps05controler = require('./controllers/california/aireacion/ps05');
const ps06controler = require('./controllers/california/aireacion/ps06');
const ps07controler = require('./controllers/california/aireacion/ps07');
const ps08controler = require('./controllers/california/aireacion/ps08');
const ps09controler = require('./controllers/california/aireacion/ps09');
const ps10controler = require('./controllers/california/aireacion/ps10');
const ps11controler = require('./controllers/california/aireacion/ps11');
const ps12controler = require('./controllers/california/aireacion/ps12');
const ps13controler = require('./controllers/california/aireacion/ps13');
const ps14controler = require('./controllers/california/aireacion/ps14');
const ps15controler = require('./controllers/california/aireacion/ps15');
const ps16controler = require('./controllers/california/aireacion/ps16');
const ps17controler = require('./controllers/california/aireacion/ps17');
const ps18controler = require('./controllers/california/aireacion/ps18');
const ps19controler = require('./controllers/california/aireacion/ps19');
const ps20controler = require('./controllers/california/aireacion/ps20');
const cb1controler = require('./controllers/cabala1/ebCabala1');
const cb2controler = require('./controllers/cabala2/ebCabala2');


connectionDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth/auth'));
app.use('/api/santapriscila/california/eb', require('./routes/santapriscila/california/eb'));
app.use('/api/santapriscila/chanduy/eb', require('./routes/santapriscila/chanduy/eb'));

wss.setMaxListeners(20)

wss.on('connection', (ws) => {
    /* clientSubscriptions.set(ws, false) */
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`)
        
        if (message.toString().includes('PisCali')) {
            piscontroler.handleSubscription(ws, message)
        } else if (message.toString().includes('SD')) {
            sDcontroler.handleSubscriptionSD(ws, message)
        }else if (message.toString().includes('PSM')) {
            psmcontroler.handleSubscriptionPSM(ws, message)
        }else if (message.toString().includes('SF')) {
            sfcontroler.handleSubscriptionSF(ws, message)
        }else if (message.toString().includes('SB')) {
            sbcontroler.handleSubscriptionSB(ws, message)
        }else if (message.toString().includes('SMA')) {
            smacontroler.handleSubscriptionSMA(ws, message)
        }else if (message.toString().includes('SRA')) {
            sracontroler.handleSubscriptionSRA(ws, message)
        }else if (message.toString().includes('SRB')) {
            srbcontroler.handleSubscriptionSRB(ws, message)
        }else if (message.toString().includes('StatusEBCali')) {
            statusEBCalicontroler.handleSubscriptionStatusEBCali(ws, message)
        }else if (message.toString().includes('DP')) {
            dpcontroler.handleSubscriptionDP(ws, message)
        }else if (message.toString().includes('1B')) {
            eb1bcontroler.handleSubscription1B(ws, message)
        }else if (message.toString().includes('APN')) {
            apncontroler.handleSubscriptionAPN(ws, message)
        }else if (message.toString().includes('CMP')) {
            cmpcontroler.handleSubscriptionCMP(ws, message)
        }else if (message.toString().includes('PNM')) {
            pnmcontroler.handleSubscriptionPNM(ws, message)
        }else if (message.toString().includes('StatusEBChanduy')) {
            statusEBChanduycontroler.handleSubscriptionStatusEBChanduy(ws, message)
        }else if (message.toString().includes('PC01')) {
            pc01controler.handleSubscriptionPC01(ws, message)
        }else if (message.toString().includes('PC02')) {
            pc02controler.handleSubscriptionPC02(ws, message)
        }else if (message.toString().includes('PC02')) {
            pc02controler.handleSubscriptionPC02(ws, message)
        }else if (message.toString().includes('PC03')) {
            pc03controler.handleSubscriptionPC03(ws, message)
        }else if (message.toString().includes('PC04')) {
            pc04controler.handleSubscriptionPC04(ws, message)
        }else if (message.toString().includes('PC05')) {
            pc05controler.handleSubscriptionPC05(ws, message)
        }else if (message.toString().includes('PC06')) {
            pc06controler.handleSubscriptionPC06(ws, message)
        }else if (message.toString().includes('PC07')) {
            pc07controler.handleSubscriptionPC07(ws, message)
        }else if (message.toString().includes('PC08')) {
            pc08controler.handleSubscriptionPC08(ws, message)
        }else if (message.toString().includes('PC09')) {
            pc09controler.handleSubscriptionPC09(ws, message)
        }else if (message.toString().includes('PC10')) {
            pc10controler.handleSubscriptionPC10(ws, message)
        }else if (message.toString().includes('PC11')) {
            pc11controler.handleSubscriptionPC11(ws, message)
        }else if (message.toString().includes('PC12')) {
            pc12controler.handleSubscriptionPC12(ws, message)
        }else if (message.toString().includes('PC13')) {
            pc13controler.handleSubscriptionPC13(ws, message)
        }else if (message.toString().includes('PC14')) {
            pc14controler.handleSubscriptionPC14(ws, message)
        }else if (message.toString().includes('PC15')) {
            pc15controler.handleSubscriptionPC15(ws, message)
        }else if (message.toString().includes('PC16')) {
            pc16controler.handleSubscriptionPC16(ws, message)
        }else if (message.toString().includes('PC17')) {
            pc17controler.handleSubscriptionPC17(ws, message)
        }else if (message.toString().includes('PC18')) {
            pc18controler.handleSubscriptionPC18(ws, message)
        }else if (message.toString().includes('PS01')) {
            ps01controler.handleSubscriptionPS01(ws, message)
        }else if (message.toString().includes('PS02')) {
            ps02controler.handleSubscriptionPS02(ws, message)
        }else if (message.toString().includes('PS03')) {
            ps03controler.handleSubscriptionPS03(ws, message)
        }else if (message.toString().includes('PS04')) {
            ps04controler.handleSubscriptionPS04(ws, message)
        }else if (message.toString().includes('PS05')) {
            ps05controler.handleSubscriptionPS05(ws, message)
        }else if (message.toString().includes('PS06')) {
            ps06controler.handleSubscriptionPS06(ws, message)
        }else if (message.toString().includes('PS07')) {
            ps07controler.handleSubscriptionPS07(ws, message)
        }else if (message.toString().includes('PS08')) {
            ps08controler.handleSubscriptionPS08(ws, message)
        }else if (message.toString().includes('PS09')) {
            ps09controler.handleSubscriptionPS09(ws, message)
        }else if (message.toString().includes('PS10')) {
            ps10controler.handleSubscriptionPS10(ws, message)
        }else if (message.toString().includes('PS11')) {
            ps11controler.handleSubscriptionPS11(ws, message)
        }else if (message.toString().includes('PS12')) {
            ps12controler.handleSubscriptionPS12(ws, message)
        }else if (message.toString().includes('PS13')) {
            ps13controler.handleSubscriptionPS13(ws, message)
        }else if (message.toString().includes('PS14')) {
            ps14controler.handleSubscriptionPS14(ws, message)
        }else if (message.toString().includes('PS15')) {
            ps15controler.handleSubscriptionPS15(ws, message)
        }else if (message.toString().includes('PS16')) {
            ps16controler.handleSubscriptionPS16(ws, message)
        }else if (message.toString().includes('PS17')) {
            ps17controler.handleSubscriptionPS17(ws, message)
        }else if (message.toString().includes('PS18')) {
            ps18controler.handleSubscriptionPS18(ws, message)
        }else if (message.toString().includes('PS19')) {
            ps19controler.handleSubscriptionPS19(ws, message)
        }else if (message.toString().includes('PS20')) {
            ps20controler.handleSubscriptionPS20(ws, message)
        }else if (message.toString().includes('CB1')) {
            cb1controler.handleSubscriptionCB1(ws, message)
        }else if (message.toString().includes('CB2')) {
            cb2controler.handleSubscriptionCB2(ws, message)
        }

    })

    ws.on('close', () => {
        /* clientSubscriptions.delete(ws); */
        console.log('Cliente desconectado')
       /*  if ([...clientSubscriptions.values()].every(subscribed => !subscribed)) {
            clearInterval(interval)
            interval = null
        } */
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});


server.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutandose en puerto ${process.env.PORT}`)
});

module.exports = wss;

/* require('./controllers/chanduy/EB1b');
require('./controllers/chanduy/ebapendice');
require('./controllers/chanduy/depesca');
require('./controllers/chanduy/ebcamarpasa');
require('./controllers/chanduy/ebPanamao');
require('./controllers/chanduy/estadoBombasChanduy');
require('./controllers/california/bombeo/ebPrecSantaMonica');
require('./controllers/california/bombeo/ebSanDiego');
require('./controllers/california/bombeo/estadoBombasCalifornia');
require('./controllers/california/bombeo/ebSanFranscisco');
require('./controllers/california/bombeo/ebSantaBarbara');
require('./controllers/california/bombeo/ebSantaMonicaA');
require('./controllers/california/bombeo/ebSantaRosaA');
require('./controllers/california/bombeo/ebSantaRosaB');

require('./controllers/california/aireacion/infoGeneralPiscinas'); */