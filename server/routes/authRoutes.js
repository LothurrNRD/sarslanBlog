const express = require('express');
const router = express.Router();
// login fonksiyonunu da içeri aktardık
const { register, login } = require('../controllers/authController'); 

// POST https://sarslanblog-1.onrender.com/api/auth/register
router.post('/register', register);

// POST https://sarslanblog-1.onrender.com/api/auth/login
router.post('/login', login); // Yeni rotamız!

module.exports = router;