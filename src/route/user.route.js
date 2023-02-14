const express = require('express');
const { userController } = require('../controller');
const { validateLogin } = require('../middleware/index');

const router = express.Router();

router.post('/login', validateLogin.validateLogin, userController.userLogin);

module.exports = router;