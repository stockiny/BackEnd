const express = require("express");
const router = express.Router();
const adminController = require('../Controller/admin');

router.post('/login', adminController.login);

module.exports = router;

