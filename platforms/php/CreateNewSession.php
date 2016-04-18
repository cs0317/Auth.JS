<?php
$FB_OAUTH_URL = "/";

session_start();

require 'vendor/autoload.php';

Flight::route('GET /', function(){
    // if request.remote_addr!= "127.0.0.1":
    // abort(403)
    //     if "UserID" in request.form and len(request.form["UserID"]) == 0:
    // session.clear()
    //                           resp = make_response(render_template("index.html"))
    //                           resp.set_cookie('LoginPageUrl', '/')
    //                           return resp
    // var_dump($_GET);
    // E.g. find if the user is logged in
    if($_SESSION['userid']) {
    // Logged in
    echo("logged in");
    }
    else {
    // Not logged in
    echo("not logged in");
    }

});

Flight::route('POST /Auth.JS/php/CreateNewSession.php', function(){
// $_SESSION["zim"] = "An invader from another planet.";

    // if "UserID" in request.form and len(request.form["UserID"]) > 0:
    // session["UserID"] = request.form["UserID"]
    //                       session["FullName"] = request.form["FullName"]
    //                       session["email"] = request.form["email"]
    //                       return ("OK")
});

Flight::route('GET /login', function(){
    // Flight::redirect($FB_OAUTH_URL);
    // Use session variables
    $_SESSION['userid'] = "pcao";
    echo("hello login");
    Flight::redirect("/");
});


Flight::route('GET /logout', function(){
    // session.clear()
    // return redirect("/")
    session_destroy();
    Flight::redirect('/');
});


Flight::route('GET /Auth.JS/aspx/AllInOne.aspx', function(){
    Flight::redirect('/');
});

Flight::start();

?>