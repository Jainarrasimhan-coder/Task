const express = require('express');
const router = express.Router();
const verifyToken = require('../helper/verifytoken');
const authController = require('../controllers/auth.controller');

router.post('/sign_up', authController.signUp);

router.post('/login', authController.login);

router.post("/get", verifyToken, authController.getUser);

router.put("/update", verifyToken, authController.updateUser);

module.exports = router;