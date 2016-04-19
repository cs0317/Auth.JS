<?php

session_start();

$AUTHJS_LOCAL_SERVER = "a.local.com";
$AUTHJS_LOCAL_PORT = 3000;
$AUTHJS_FB_APP_ID = 460545824136907;
$AUTHJS_FB_APP_SCOPE = "user_about_me,email";

$format = "https://www.facebook.com/v2.0/dialog/oauth?response_type=code&scope=%s&redirect_uri=http://%s:%d/login/Facebook&client_id=%d";
$FB_OAUTH_URL = sprintf($format, $AUTHJS_FB_APP_SCOPE, $AUTHJS_LOCAL_SERVER, $AUTHJS_LOCAL_PORT, $AUTHJS_FB_APP_ID);

Flight::set('FB_OAUTH_URL', $FB_OAUTH_URL);

Flight::route('GET /', function(){
    if ($_SERVER['REMOTE_ADDR'] != "127.0.0.1" and $_SERVER['REMOTE_ADDR'] != "::1"){
        // TODO: return 403 error
        echo "local access only";
        return;
    }
    Flight::render('index.php', array(
        'UserID' => $_SESSION['UserID'],
        'FullName' => $_SESSION['FullName'],
        'email' => $_SESSION['email']
    ));
});

Flight::route('POST /Auth.JS/php/CreateNewSession.php', function(){
    $UserID = Flight::request()->data->UserID;
    if (strlen($UserID) > 0){
        session_destroy();
        $_SESSION['UserID'] = $UserID;
        $_SESSION['FullName'] = $FullName;
        $_SESSION['email'] = $email;
    }
});

Flight::route('GET /login', function(){
    Flight::redirect(Flight::get("FB_OAUTH_URL"));
});

Flight::route('GET /logout', function(){
    session_destroy();
    Flight::redirect('/');
});

Flight::start();

?>