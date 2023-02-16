const express = require('express');
const { blogsPostsController } = require('../controller');
const { validateToken } = require('../middleware/validateToken');

const router = express.Router();

router.get('/post', validateToken, blogsPostsController.getAll); 
router.get('/post/:id', validateToken, blogsPostsController.getById); 
// router.post('/post', validateToken, blogsPostsController.createPost); 
module.exports = router;