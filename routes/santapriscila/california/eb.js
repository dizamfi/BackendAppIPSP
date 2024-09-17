const { Router } = require('express');
const router = Router();
const { getEbPrecSantaMonicaHistorial, getEbSanDiegoHistorial, getEbSanFransciscoHistorial, getEbSantaBarbaraHistorial, getEbSantaMonicaAHistorial, getEbSantaRosaAHistorial, getEbSantaRosaBHistorial } = require('../../../controllers/california/bombeo/history/historyeb');

router.post('/psm/historial', getEbPrecSantaMonicaHistorial);

router.post('/sd/historial', getEbSanDiegoHistorial);

router.post('/sf/historial', getEbSanFransciscoHistorial);

router.post('/sb/historial', getEbSantaBarbaraHistorial);

router.post('/sma/historial', getEbSantaMonicaAHistorial);

router.post('/sra/historial', getEbSantaRosaAHistorial);

router.post('/srb/historial', getEbSantaRosaBHistorial);

module.exports = router;