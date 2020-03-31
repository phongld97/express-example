const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.getCreate);

router.post('/create', userController.postCreate);

router.get('/:id', userController.getId);

module.exports = router;