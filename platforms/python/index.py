#!/usr/bin/env python
from flask import Flask, request, session, redirect, render_template, flash
from flask import abort

app = Flask(__name__)

@app.route('/', methods = ['GET'])
def index():
    if request.remote_addr != "127.0.0.1":
        abort(403)
    if "UserID" in session:
        return "Hello" + session["UserID"]
    else:
        return '''
        <a href="https://www.facebook.com/v2.0/dialog/oauth?response_type=code&scope=user_about_me,email&redirect_uri=http://a.local.com:3000/login/Facebook&client_id=460545824136907">Login</a>
        '''

@app.route('/Auth.JS/aspx/CreateNewSession.aspx', methods = ['POST'])
def create_new_session():
    if "UserID" in request.form:
        if request.form['UserID'] != "":
            print(request.form)
            session["UserID"] = request.form["UserID"]
            session["FullName"] = request.form["FullName"]
            session["email"] = request.form["email"]
    return ("OK")

@app.route('/logout', methods = ['GET'])
def logout():
    session.pop('UserID', None)
    return redirect("/")

if __name__ == '__main__':
    import os
    app.debug = True
    app.secret_key = os.urandom(24)
    app.run(host='0.0.0.0', port=80)
