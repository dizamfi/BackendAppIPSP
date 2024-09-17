const { Router } = require('express');
const { getPC01, getPC01TA, getPC02, getPC02TA, getPC02TCP, getPC03, getPC03TA, getPC03TCP, getPC04, getPC04TA, getPC04TCP, getPC05, getPC05TA, getPC05TCP, getPC06, getPC06TA, getPC06TCP, getPC07, getPC07TA, getPC07TCP, getPC08, getPC08TA, getPC08TCP, getPC09, getPC09TA, getPC09TCP, getPC10, getPC10TA, getPC10TCP, getPC11, getPC11TA, getPC12, getPC12TA, getPC12TCP, getPC13, getPC13TA, getPC13TCP, getPC14, getPC14TA, getPC14TCP, getPC15, getPC15TA, getPC15TCP, getPC16, getPC16TA, getPC17, getPC17TA, getPC17TCP, getPC18, getPC18TA, getPC18TCP, getPISO1, getPISO1TA, getPIS01TCP, getPISO2, getPISO2TA, getPIS02TCP, getPISO3, getPISO3TA, getPIS03TCP, getPISO4, getPISO4TA, getPIS04TCP, getPISO5, getPISO5TA, getPIS05TCP, getPISO6, getPISO6TA, getPIS06TCP, getPISO7, getPISO7TA, getPIS07TCP, getPISO8, getPISO8TA, getPIS08TCP, getPISO9, getPISO9TA, getPIS09TCP, getPIS10, getPIS10TA, getPIS11, getPIS11TA, getPIS11TCP, getPIS12, getPIS12TA, getPIS12TCP, getPIS13, getPIS13TA, getPIS13TCP, getPIS14, getPIS14TA, getPIS14TCP, getPIS15, getPIS15TA, getPIS15TCP, getPIS16, getPIS16TA, getPIS16TCP, getPIS17, getPIS17TA, getPIS17TCP, getPIS18, getPIS18TA, getPIS18TCP, getPIS19, getPIS19TA, getPIS19TCP, getPIS20, getPIS20TA, getPIS20TCP, getPC01Antenas, getPC02Antenas, getPC03Antenas, getPC04Antenas, getPC05Antenas, getPC06Antenas, getPC07Antenas, getPC08Antenas, getPC09Antenas, getPC10Antenas, getPC11Antenas, getPC12Antenas, getPC13Antenas, getPC14Antenas, getPC15Antenas, getPC16Antenas, getPC17Antenas, getPC18Antenas, getPISO1Antenas, getPISO2Antenas, getPISO3Antenas, getPISO4Antenas, getPISO5Antenas, getPISO6Antenas, getPISO7Antenas, getPISO8Antenas, getPISO9Antenas, getPIS10Antenas, getPIS11Antenas, getPIS12Antenas, getPIS13Antenas, getPIS14Antenas, getPIS15Antenas, getPIS16Antenas, getPIS17Antenas, getPIS18Antenas, getPIS19Antenas, getPIS20Antenas, getAntenasSectoriales, getPiscinasInfoGeneral  } = require('../../../controllers/santapriscila/california/aireacion');
const router = Router();

router.get('/pc01', getPC01);
router.get('/pc01/ta', getPC01TA);
router.get('/pc01/antenas', getPC01Antenas);

router.get('/pc02', getPC02);
router.get('/pc02/ta', getPC02TA);
router.get('/pc02/tcp', getPC02TCP);
router.get('/pc02/antenas', getPC02Antenas);

router.get('/pc03', getPC03);
router.get('/pc03/ta', getPC03TA);
router.get('/pc03/tcp', getPC03TCP);
router.get('/pc03/antenas', getPC03Antenas);

router.get('/pc04', getPC04);
router.get('/pc04/ta', getPC04TA);
router.get('/pc04/tcp', getPC04TCP);
router.get('/pc04/antenas', getPC04Antenas);

router.get('/pc05', getPC05);
router.get('/pc05/ta', getPC05TA);
router.get('/pc05/tcp', getPC05TCP);
router.get('/pc05/antenas', getPC05Antenas);

router.get('/pc06', getPC06);
router.get('/pc06/ta', getPC06TA);
router.get('/pc06/tcp', getPC06TCP);
router.get('/pc06/antenas', getPC06Antenas);

router.get('/pc07', getPC07);
router.get('/pc07/ta', getPC07TA);
router.get('/pc07/tcp', getPC07TCP);
router.get('/pc07/antenas', getPC07Antenas);

router.get('/pc08', getPC08);
router.get('/pc08/ta', getPC08TA);
router.get('/pc08/tcp', getPC08TCP);
router.get('/pc08/antenas', getPC08Antenas);

router.get('/pc09', getPC09);
router.get('/pc09/ta', getPC09TA);
router.get('/pc09/tcp', getPC09TCP);
router.get('/pc09/antenas', getPC09Antenas);

router.get('/pc10', getPC10);
router.get('/pc10/ta', getPC10TA);
router.get('/pc10/tcp', getPC10TCP);
router.get('/pc10/antenas', getPC10Antenas);

router.get('/pc11', getPC11);
router.get('/pc11/ta', getPC11TA);
router.get('/pc11/antenas', getPC11Antenas);

router.get('/pc12', getPC12);
router.get('/pc12/ta', getPC12TA);
router.get('/pc12/tcp', getPC12TCP);
router.get('/pc12/antenas', getPC12Antenas);

router.get('/pc13', getPC13);
router.get('/pc13/ta', getPC13TA);
router.get('/pc13/tcp', getPC13TCP);
router.get('/pc13/antenas', getPC13Antenas);

router.get('/pc14', getPC14);
router.get('/pc14/ta', getPC14TA);
router.get('/pc14/tcp', getPC14TCP);
router.get('/pc14/antenas', getPC14Antenas);

router.get('/pc15', getPC15);
router.get('/pc15/ta', getPC15TA);
router.get('/pc15/tcp', getPC15TCP);
router.get('/pc15/antenas', getPC15Antenas);

router.get('/pc16', getPC16);
router.get('/pc16/ta', getPC16TA);
router.get('/pc16/antenas', getPC16Antenas);

router.get('/pc17', getPC17);
router.get('/pc17/ta', getPC17TA);
router.get('/pc17/tcp', getPC17TCP);
router.get('/pc17/antenas', getPC17Antenas);

router.get('/pc18', getPC18);
router.get('/pc18/ta', getPC18TA);
router.get('/pc18/tcp', getPC18TCP);
router.get('/pc18/antenas', getPC18Antenas);

router.get('/ps01', getPISO1);
router.get('/ps01/ta', getPISO1TA);
router.get('/ps01/tcp', getPIS01TCP);
router.get('/ps01/antenas', getPISO1Antenas);

router.get('/ps02', getPISO2);
router.get('/ps02/ta', getPISO2TA);
router.get('/ps02/tcp', getPIS02TCP);
router.get('/ps02/antenas', getPISO2Antenas);

router.get('/ps03', getPISO3);
router.get('/ps03/ta', getPISO3TA);
router.get('/ps03/tcp', getPIS03TCP);
router.get('/ps03/antenas', getPISO3Antenas);

router.get('/ps04', getPISO4);
router.get('/ps04/ta', getPISO4TA);
router.get('/ps04/tcp', getPIS04TCP);
router.get('/ps04/antenas', getPISO4Antenas);

router.get('/ps05', getPISO5);
router.get('/ps05/ta', getPISO5TA);
router.get('/ps05/tcp', getPIS05TCP);
router.get('/ps05/antenas', getPISO5Antenas);

router.get('/ps06', getPISO6);
router.get('/ps06/ta', getPISO6TA);
router.get('/ps06/tcp', getPIS06TCP);
router.get('/ps06/antenas', getPISO6Antenas);

router.get('/ps07', getPISO7);
router.get('/ps07/ta', getPISO7TA);
router.get('/ps07/tcp', getPIS07TCP);
router.get('/ps07/antenas', getPISO7Antenas);

router.get('/ps08', getPISO8);
router.get('/ps08/ta', getPISO8TA);
router.get('/ps08/tcp', getPIS08TCP);
router.get('/ps08/antenas', getPISO8Antenas);

router.get('/ps09', getPISO9);
router.get('/ps09/ta', getPISO9TA);
router.get('/ps09/tcp', getPIS09TCP);
router.get('/ps09/antenas', getPISO9Antenas);

router.get('/ps10', getPIS10);
router.get('/ps10/ta', getPIS10TA);
router.get('/ps10/antenas', getPIS10Antenas);

router.get('/ps11', getPIS11);
router.get('/ps11/ta', getPIS11TA);
router.get('/ps11/tcp', getPIS11TCP);
router.get('/ps11/antenas', getPIS11Antenas);

router.get('/ps12', getPIS12);
router.get('/ps12/ta', getPIS12TA);
router.get('/ps12/tcp', getPIS12TCP);
router.get('/ps12/antenas', getPIS12Antenas);

router.get('/ps13', getPIS13);
router.get('/ps13/ta', getPIS13TA);
router.get('/ps13/tcp', getPIS13TCP);
router.get('/ps13/antenas', getPIS13Antenas);

router.get('/ps14', getPIS14);
router.get('/ps14/ta', getPIS14TA);
router.get('/ps14/tcp', getPIS14TCP);
router.get('/ps14/antenas', getPIS14Antenas);

router.get('/ps15', getPIS15);
router.get('/ps15/ta', getPIS15TA);
router.get('/ps15/tcp', getPIS15TCP);
router.get('/ps15/antenas', getPIS15Antenas);

router.get('/ps16', getPIS16);
router.get('/ps16/ta', getPIS16TA);
router.get('/ps16/tcp', getPIS16TCP);
router.get('/ps16/antenas', getPIS16Antenas);

router.get('/ps17', getPIS17);
router.get('/ps17/ta', getPIS17TA);
router.get('/ps17/tcp', getPIS17TCP);
router.get('/ps17/antenas', getPIS17Antenas);

router.get('/ps18', getPIS18);
router.get('/ps18/ta', getPIS18TA);
router.get('/ps18/tcp', getPIS18TCP);
router.get('/ps18/antenas', getPIS18Antenas);

router.get('/ps19', getPIS19);
router.get('/ps19/ta', getPIS19TA);
router.get('/ps19/tcp', getPIS19TCP);
router.get('/ps19/antenas', getPIS19Antenas);

router.get('/ps20', getPIS20);
router.get('/ps20/ta', getPIS20TA);
router.get('/ps20/tcp', getPIS20TCP);
router.get('/ps20/antenas', getPIS20Antenas);

router.get('/antenas', getAntenasSectoriales);
router.get('/piscinas', getPiscinasInfoGeneral);


module.exports = router;