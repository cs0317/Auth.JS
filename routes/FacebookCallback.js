
var FB              = require('../fb'),
    request   = require('request'),
    config          = require('../config');

FB.options({
    appId: config.Facebook.appId,
    appSecret: config.Facebook.appSecret,
    redirectUri: config.rootUrl + 'login/Facebook'
});

exports.loginCallback = function (req, res) {
    setSessionVars = function (result) {      
        FB.api('me', {
            fields: 'name,email',
            access_token: result.access_token
        }, function (userInfo) {
            if (!userInfo || userInfo.error) {
                return res.send(500, 'error');
            }
            AbandonAndCreateSession(userInfo);
        });
    }
    
    exchangeCodeForAccessToken = function (code) {
        FB.napi('oauth/access_token', {
            client_id: FB.options('appId'),
            client_secret: FB.options('appSecret'),
            redirect_uri: FB.options('redirectUri'),
            code: code
        }, function (err, response) {
            if (err) throw (err);
            setSessionVars(response);
        });
    }
    AbandonAndCreateSession=function (userInfo) {
        request({
            url: 'http://localhost/Auth.JS/'+config.WebAppSettings.platform.name+'/CreateNewSession.'+config.WebAppSettings.platform.fileExtension, 
            method: 'POST'
        }, function (error, response, body) {
            request({
                url: 'http://localhost/Auth.JS/' + config.WebAppSettings.platform.name + '/CreateNewSession.' + config.WebAppSettings.platform.fileExtension, 
                method: 'POST',
                form: {
                    UserID: userInfo.id,
                    FullName: userInfo.name,
                    email: userInfo.email
                }
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    var setcookie = response.headers["set-cookie"];
                    res.setHeader('Set-Cookie', setcookie);
                    return res.redirect(req.cookies["LoginPageUrl"]);
                }
            });
        });
    }
    var code = req.query.code;
    if (req.query.error) {
        // user might have disallowed the app
        return res.send('login-error ' + req.query.error_description);
    } else if (!code) {
        return res.redirect('/');
    }
    try {
        exchangeCodeForAccessToken(code);
    }
    catch (err) {
        if (err) throw (err);
    }
}

