
var config = { };

// should end in /
/*  shuo            config.rootUrl  = process.env.ROOT_URL                  || 'http://localhost:3000/';    */
if (typeof process.env.PORT == 'undefined') 
    process.env.PORT = 3000;
config.rootUrl = 'http://a.local.com:'+ process.env.PORT + '/';
//} else {
 //   config.rootUrl = 'http://localhost:' + process.env.PORT + '/';
//}

config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '460545824136907',
    appSecret:      process.env.FACEBOOK_APPSECRET      || 'ef3bd2f183e07b694645c94afbc1549b',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'nodescrumptious',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  config.rootUrl + 'login/callback'
};

config.appEntryUri = "http://a.local.com/Auth.JS.SetSession/aspx/test.aspx"

module.exports = config;
