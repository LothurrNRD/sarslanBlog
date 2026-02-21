const express = require('express');
const router = express.Router();
// login fonksiyonunu da içeri aktardık
const { register, login } = require('../controllers/authController'); 

// POST http://localhost:5000/api/auth/register
router.post('/register', register);

// POST http://localhost:5000/api/auth/login
router.post('/login', login); // Yeni rotamız!

module.exports = router;