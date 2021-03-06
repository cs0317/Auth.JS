
var express = require('express'),
    FB = require('./fb'),
    http = require('http'),
    path = require('path'),

    config = require('./config'),
    home = require('./routes/home');
    FacebookCallBack = require('./routes/FacebookCallback');

var app = express();

if(!config.Facebook.appId || !config.Facebook.appSecret) {
    throw new Error('facebook appId and appSecret required in config.js');
}

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.cookieSession({ secret: '65874653785634_StringThatIRandomlyTyped'}));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

app.get( '/',                home.index);
app.get( '/login/Facebook', FacebookCallBack.loginCallback);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
