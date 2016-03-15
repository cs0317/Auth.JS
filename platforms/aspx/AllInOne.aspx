<html>
<head>

    <title></title>
</head>

<body>

<%@ Page Language="C#" %>




<div style="background-color: #00ffff">
<%if (Session["UserID"]!=null) { %>


    <!-- #include virtual = ".\buttons\sign_out_button.inc" -->

<% } else { %>




   <!-- #include virtual = ".\buttons\Facebook_login_button.inc" -->

<% } %>



</div>

<br /><br /><br /><br />
<h3>Current session variable values: <br /></h3>

Session["UserID"]=<%:Session["UserID"]%> <br />
Session["FullName"]=<%:Session["fullname"]%> <br />
Session["email"]=<%:Session["email"]%> <br />

</body>
</html>
