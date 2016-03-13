
var FB              = require('../fb'),
  //  Step            = require('step'),
    request   = require('request'),
    config          = require('../config');

FB.options({
    appId:          config.facebook.appId,
    appSecret:      config.facebook.appSecret,
    redirectUri:    config.facebook.redirectUri
});

exports.index = function(req, res) {
    var accessToken = req.session.access_token;
    if(!accessToken) {
        res.render('index', {
            title: 'Express',
            loginUrl: FB.getLoginUrl({ scope: 'user_about_me' })
        });
    } else {
        res.render('menu', {
            session_UserID: req.session.UserID,
            session_FullName: req.session.FullName
        });
    }
};

exports.loginCallback = function (req, res) {
    
    setSessionVars = function (result) {      
        FB.api('me', {
            fields: 'name',
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
            url: 'http://localhost/Auth.JS.SetSession/aspx/CreateNewSession.aspx', //URL to hit
            method: 'POST'
        }, function (error, response, body) {
            request({
                url: 'http://localhost/Auth.JS.SetSession/aspx/CreateNewSession.aspx', //URL to hit
                method: 'POST',
                form: {
                    UserID: userInfo.id,
                    FullName: userInfo.name
                }
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    var setcookie = response.headers["set-cookie"];
                    res.setHeader('Set-Cookie', setcookie);
                    return res.redirect(config.appEntryUri);
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

exports.logout = function (req, res) {
    req.session = null; // clear session
    res.redirect('/');
};
