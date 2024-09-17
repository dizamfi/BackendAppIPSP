const { Router } = require('express');
const { loginUser, createUser } = require('../../controllers/auth');
const router = Router();

router.post('/login', loginUser);
router.post('/create', createUser);

module.exports = router;