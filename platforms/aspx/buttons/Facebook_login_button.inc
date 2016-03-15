<!--  Facebook login button -->
   <script runat="server">

      void Facebook_login(object sender, System.EventArgs e)
 {

          var ReturnPort="3000";
          if (!String.IsNullOrEmpty(Request.QueryString["ReturnPort"]))
               ReturnPort=Request.QueryString["ReturnPort"];
          Response.Redirect("https://www.facebook.com/v2.0/dialog/oauth?response_type=code&scope=user_about_me%2Cemail&redirect_uri=http%3A%2F%2Fa.local.com%3A"+ReturnPort+"%2Flogin%2Fcallback&client_id=460545824136907");

      }

    </script>
    <form runat="server">
        <asp:ImageButton runat="server" OnClick="Facebook_login
" ImageUrl="Facebook_login.png" width=100 height=40 />

     </form>
<!--  end of Facebook login button -->