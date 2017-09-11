var express = require('express');
var router = express.Router();
var musicControl = require('../controller/music')
router.post('/nateAPI/search',musicControl.search)
router.post('/nateAPI/songsDetail',musicControl.songDetail)
router.post('/nateAPI/lyricDetail',musicControl.lyricDetail)
router.post('/nateAPI/songUrl',musicControl.songUrl)
router.post('/nateAPI/picUrl',musicControl.picUrl)

var userControl = require('../controller/user')
router.post('/user/login',userControl.login)
router.post('/user/check',userControl.check)
router.post('/user/create',userControl.createUser)
module.exports = router;