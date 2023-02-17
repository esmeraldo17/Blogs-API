const express = require('express');
const { userController } = require('../controller');
const { validateLogin } = require('../middleware/index');
const { validateToken } = require('../middleware/validateToken');

const router = express.Router();

router.post('/login', validateLogin.validateLogin, userController.userLogin);
router.post('/user', userController.createUser);
router.get('/user', validateToken, userController.getAll);
router.get('/user/:id', validateToken, userController.getById);
router.delete('/user/me', validateToken, userController.removeUser);

module.exports = router;