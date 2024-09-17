const { Router } = require('express');
const { getEbCabala1, getEbCabala1Gral, getEbCabala1TCP, getEbCabala1Antenas, getEbCabala1Historial } = require('../../../controllers/santapriscila/cabala1/eb');
const router = Router();

router.get('/cbl1', getEbCabala1);
router.get('/cbl1/Gral', getEbCabala1Gral);
router.get('/cbl1/tcp', getEbCabala1TCP);
router.get('/cbl1/antenas', getEbCabala1Antenas);
router.post('/cbl1/historial', getEbCabala1Historial);

module.exports = router;