var userService = require('../service/user')

module.exports = {
    login: function(req,res){
        userService.login(req,res)
    },
    check: function(req,res){
        userService.check(req,res)
    },
    createUser: function (req,res) {
        userService.createUser(req,res)
    }
}
// exports.search = function(req,res){
//     musicService.search(req,res)
// }