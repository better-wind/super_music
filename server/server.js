var bodyParser  =  require('body-parser');
var session = require('express-session');

var app = require('express')()
var router = require('./models/music')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    name:'SESSION',
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use('/', router);
app.listen(4000)