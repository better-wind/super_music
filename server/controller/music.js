var musicService = require('../service/music')

module.exports = {
    search: function(req,res){
        musicService.search(req,res)
    },
    songDetail: function(req,res){
        musicService.songDetail(req,res)
    },
    lyricDetail: function(req,res){
        musicService.lyricDetail(req,res)
    },
    songUrl: function(req,res){
        musicService.songUrl(req,res)
    },
    picUrl: function(req,res){
        musicService.picUrl(req,res)
    },
}
// exports.search = function(req,res){
//     musicService.search(req,res)
// }