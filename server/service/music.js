const Netease = require('../base/netease.js')
const netease = new Netease()
module.exports = {
    search:function(req,res){
        const name = req.body.name,
            page = req.body.page,
            rows = req.body.rows
        netease.search(name,page,rows).then(data => {
            let _data = {
                code:data.code,
                data:data.result
            }
            res.send(_data)
        })
    },
    songDetail:function(req,res){
        const id = req.body.id
        netease.song(id).then( data => {

            let _data = {
                code:data.code,
                data:{
                    privileges:data.privileges,
                    songs:data.songs
                }
            }
            res.send(_data)
        })
    },
    lyricDetail:function(req,res){
        const id = req.body.id
        netease.lyric(id).then( data => {

            let _data = {
                code:data.code,
                data:{
                    lrc:data.lrc,
                }
            }
            res.send(_data)
        })
    },
    songUrl:function(req,res){
        const id = req.body.id
        netease.url(id).then( data => {
            res.send(data)
        })
    },
    picUrl:function(req,res){
        const id = req.body.id
        netease.picture(id).then( data => {
            let _data = {
               code:200,
               data:data
            }
            res.send(_data)
        })
    },
}
// exports.search = function(req,res){
//     const name = req.body.name,
//           page = req.body.page,
//           rows = req.body.rows
//     netease.search(name,page,rows).then(data => {
//         let _data = {
//            code:data.code,
//            data:data.result
//         }
//         res.send(_data)
//     })
// }