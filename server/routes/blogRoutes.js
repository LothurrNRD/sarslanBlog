const express = require('express');
const router = express.Router();
// deleteBlog'u buraya eklemeyi unutma
const { createBlog, getAllBlogs, getSingleBlog, deleteBlog } = require('../controllers/blogController');
const verifyToken = require('../middleware/authMiddleware'); // Senin güvenlik görevlin

router.get('/', getAllBlogs);
router.get('/:id', getSingleBlog);

// Burada protect yerine senin verifyToken middleware'ini koyduk
router.delete('/:id', verifyToken, deleteBlog); 

router.post('/', verifyToken, createBlog);

module.exports = router;