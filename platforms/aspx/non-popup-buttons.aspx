<html>

<head>

<style>
#grad1 {
    background: blue; /* For browsers that do not support gradients */    
    background: -webkit-linear-gradient(left, blue , green); /* For Safari 5.1 to 6.0 */
    background: -o-linear-gradient(right, blue, green); /* For Opera 11.1 to 12.0 */
    background: -moz-linear-gradient(right, blue, green); /* For Firefox 3.6 to 15 */
    background: linear-gradient(to right, blue , green); /* Standard syntax (must be last) */
    width: 700px;
}
</style>
</head>


<body>

<%@ Page Language="C#" %>

<script>
  function copyToClipboard(str1,str2) {
    window.prompt("This is the ASP.NET code of the button.\nCopy to clipboard: Ctrl+C, Enter.\n", str1+"<% =System.Configuration.ConfigurationManager.AppSettings["AuthJS_AspxStub_AbsoluteWebRoot"]%>"+str2);
  }
</script>

<div id="grad1">
<%if (Session["UserID"]!=null) { %>

    <!-- #include virtual = "/Auth.JS/aspx\buttons\sign_out_button.inc" -->
<% } else { %>



    <!-- #include virtual = "/Auth.JS/aspx\buttons\Facebook_login_button.inc" -->
<% } %>



</div>

<h3>First, test this page:<br /></h3>

1. Click any button (login or logout) on the banner above; <br />
2. See the current session variable values: <br />


<font face="Courier New" size=2>
 Session["UserID"]=<%:Session["UserID"]%> <br />
 Session["FullName"]=<%:Session["fullname"]%> <br />
 Session["email"]=<%:Session["email"]%> <br />
</font>
<br />


<h3>Next, follow the instruction to paste code into your app: <br /></h3>

1. The ASP.NET code of every button can be obtained by right-clicking the button, which you can paste anywhere you want in your ASP.NET app; <br />
2. The code below is the logic to toggle between login and logout, which you can also paste into your app.
<pre>
&lt;%if (Session["UserID"]!=null) { %&gt;
   //copy and paste the code of the logout button here.
&lt;% } else { %&gt;
   //copy and paste the code of a login button (e.g., Facebook login) here.
   //copy and paste the code of another login button (e.g., Google login) here.
   ...
&lt;% } %&gt;



</pre>


</body>
</html>
