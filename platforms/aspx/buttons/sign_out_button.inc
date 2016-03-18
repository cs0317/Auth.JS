<!-- logout button -->
  <script runat="server">

  void clearSession(object sender, System.EventArgs e)
 {

    var ReturnPort=Session["ReturnPort"];
    Session.Abandon();

    Response.Redirect("AllInOne.aspx?ReturnPort="+ReturnPort);

  }
  </script>
  <form runat="server">
    <div align="right">
     <asp:ImageButton runat="server" OnClick="clearSession
" ImageUrl="/Auth.JS/images/Sign_out.jpg" width=40 height=40 oncontextmenu="copyToClipboard('\<!-- #include virtual =&#34;','\\buttons\\sign_out_button.inc\&#34; --\>');return false;"/>
    </div>
  </form>
<!-- end of logout button -->