const { Router } = require('express');
const { getEbCabala2, getEbCabala2Gral, getEbCabala2TCP, getEbCabala2Antenas, getEbCabala2Historial } = require('../../../controllers/santapriscila/cabala2/eb');
const router = Router();

router.get('/cbl2', getEbCabala2);
router.get('/cbl2/Gral', getEbCabala2Gral);
router.get('/cbl2/tcp', getEbCabala2TCP);
router.get('/cbl2/antenas', getEbCabala2Antenas);
router.post('/cbl2/historial', getEbCabala2Historial);

module.exports = router;