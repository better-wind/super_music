var connection = require('./../mysql/mysqlDB');
function User(user) {
    this.name = user.name;
    this.password = user.password;
};
module.exports = User;
connection.connect()
User.prototype.findUser = function(name,pwd){
    return new Promise(function(reslove){
        var sql = 'SELECT * FROM user WHERE name = ? AND password = ?'
        connection.query(sql,[name,pwd],function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            reslove(result)
        });
    })
}
User.prototype.createUser = function(name,pwd){
    var _this = this
    return new Promise(function(reslove){
        var sql = 'INSERT INTO user(name,password) VALUES(?,?)'
        connection.query(sql,[name,pwd],function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            _this.findUser(name,pwd)
                .then((result)=>{
                    reslove(result)
                })

        });
    })
}
// connection.end();