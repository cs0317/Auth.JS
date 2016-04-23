var request = require('request');
var config = require('../config');

var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(config.Google.appId,
                              config.Google.appSecret,
                              config.rootUrl + 'login/Google');

exports.loginCallback = function (req, res) {

    var exchangeCodeForAccessToken = function (code) {
        oauth2Client.getToken(code, function(err, tokens) {
            // Now tokens contains an access_token and an optional refresh_token. Save them.
            console.log(`code = ${code}`);
            if(err){
                console.log(`error = ${err}`);
            }
            else{
                console.log(`tokens = ${tokens}`);
                oauth2Client.setCredentials(tokens);
                plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
                    if (err){
                        // handle err and response
                        console.log(`err= ${err}`);
                    } else {
                        var userInfo = {};
                        console.log(response);
                        userInfo.avatar = response.image.url;
                        userInfo.url = response.url;
                        userInfo.FullName = response.displayName;
                        userInfo.UserID = response.id;
                        userInfo.email = response.emails[0].value; // TODO: Do not use fixed index for emails array
                        console.log(userInfo);
                        AbandonAndCreateSession(userInfo);
                    }
                });
            }
        });
    };

    var AbandonAndCreateSession=function (userInfo) {
        console.log("Creating POST request");
        request({
            url: 'http://a.local.com/Auth.JS/'+config.WebAppSettings.platform.name+'/CreateNewSession.'+config.WebAppSettings.platform.fileExtension, 
            method: 'POST'
        }, function (error, response, body) {
            console.log("First empty POST request sent");
            if (error){
                console.log(error);
            } else {
                console.log("Sending second POST request");
                request({
                    url: 'http://a.local.com/Auth.JS/' + config.WebAppSettings.platform.name + '/CreateNewSession.' + config.WebAppSettings.platform.fileExtension, 
                    method: 'POST',
                    form: userInfo
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                    } else {
                        var setcookie = response.headers["set-cookie"];
                        res.setHeader('Set-Cookie', setcookie);
                        return res.redirect("/");
                    }
                });
            }
        });
    };

    var code = req.query.code;
    if (req.query.error) {
        //user might have disallowed the app
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
};

