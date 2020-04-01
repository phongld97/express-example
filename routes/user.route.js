const express = require('express');
const validateUser = require('../validate/user.validate');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.getCreate);

router.post('/create', validateUser.postCreate, userController.postCreate);

router.get('/:id', userController.getId);

module.exports = router;