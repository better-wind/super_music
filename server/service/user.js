var User = require('./../dataBase/user')
module.exports = {
    login:function(req,res){
        const name = req.body.name,
            pwd = req.body.pwd
        var user = new User({
            name:name,
            password:pwd
        })
        user.findUser(user.name,user.password)
            .then((rs)=>{
                let _data = {}
                if(rs.length){
                    _data = {
                        code:200,
                        data:rs[0]
                    }
                    req.session.user = rs[0].id;
                } else {
                    _data = {
                        code:500,
                        msg:'用户名或密码不正确',
                    }
                }
                res.send(_data)
            })
    },
    check:function(req,res){
        let _data = {}
        if(req.session.user){
            _data = {
                code:200,
                data:true
            }
        }
        else {
            _data = {
                code:200,
                data:false
            }
        }
        res.send(_data)
    },
    createUser:function(req,res){
        const name = req.body.name,
            pwd = req.body.pwd
        var user = new User({
            name:name,
            password:pwd
        })
        user.createUser(user.name,user.password)
            .then((rs)=>{
                let _data = {}
                _data = {
                    code:200,
                    data:rs[0]
                }
                req.session.user = rs[0].id;
                res.send(_data)
            })
    },

}
