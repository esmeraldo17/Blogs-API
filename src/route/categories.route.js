const express = require('express');
const { categoriesController } = require('../controller');
const { validateToken } = require('../middleware/validateToken');

const router = express.Router();

router.post('/categories', validateToken, categoriesController.createCategory);
router.get('/categories', validateToken, categoriesController.getAll);

module.exports = router;