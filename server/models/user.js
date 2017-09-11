var express = require('express');
var router = express.Router();
var userControl = require('../controller/user')
router.post('/user/login',userControl.login)

module.exports = router;