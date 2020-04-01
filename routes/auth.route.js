const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/login', authMiddleware.authAfterLogin, authController.login);
router.post('/login', authController.authPost);

module.exports = router;