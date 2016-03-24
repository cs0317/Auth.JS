<html>

<head>

<style>
/* Tabs */
div.tabs {
  min-height: 40em;		/* No height: can grow if :target doesn't work */
  position: relative;		/* Establish a containing block */
  line-height: 1;		/* Easier to calculate with */
  z-index: 0}			/* So that we can put other things behind */
div.tabs > div {
  display: inline}		/* We want the buttons all on one line */
div.tabs > div > a {
  color: black;			/* Looks more like a button than a link */
  background: #CCC;		/* Active tabs are light gray */
  padding: 0.2em;		/* Some breathing space */
  border: 0.1em outset #BBB;	/* Make it look like a button */
  border-bottom: 0.1em solid #CCC} /* Visually connect tab and tab body */
div.tabs > div:not(:target) > a {
  border-bottom: none;		/* Make the bottom border disappear */
  background: #999}		/* Inactive tabs are dark gray */
div.tabs > div:target > a,	/* Apply to the targeted item or... */
:target #default2 > a {		/* ... to the default item */
  border-bottom: 0.1em solid #CCC; /* Visually connect tab and tab body */
  background: #CCC}		/* Active tab is light gray */
div.tabs > div > div {
  background: #CCC;		/* Light gray */
  z-index: -2;			/* Behind, because the borders overlap */
  left: 0; top: 1.3em;		/* The top needs some calculation... */
  bottom: 0; right: 0;		/* Other sides flush with containing block */
  overflow: auto;		/* Scroll bar if needed */
  padding: 0.3em;		/* Looks better */
  border: 0.1em outset #BBB}	/* 3D look */
div.tabs > div:not(:target) > div { /* Protect CSS1 & CSS2 browsers */
  position: absolute }		/* All these DIVs overlap */
div.tabs > div:target > div, :target #default2 > div {
  position: absolute;		/* All these DIVs overlap */
  z-index: -1}			/* Raise it above the others */

div.tabs :target {
  outline: none}
</style>
</head>


<body>

<%@ Page Language="C#" %>

<script src="..\includes\utils.js">
</script>

    <div class=tabs>
     <div id=tab1> <a href="#tab1">Non-popup buttons</a>
       <div>
        <iframe width="720" height="600" frameBorder="1" scrolling="no" name='iframe_nonPopup'></iframe>
        <script>
          window.open("<% =System.Configuration.ConfigurationManager.AppSettings["AuthJS_AspxStub_AbsoluteWebRoot"] %>"
                       +"/non-popup-buttons.aspx?ReturnPort="+getQueryString('ReturnPort')
                      ,'iframe_nonPopup');
        </script>
      </div>
     </div>

     <div id=tab2> <a href="#tab2">Popup buttons</a>
      <div>... 30 lines of CSS is rather a lot, and...</div>
     </div>

     <div id=tab3> <a href="#tab3">Linking buttons</a>
      <div>... that 2 should have been enough, but...</div>
     </div>


     <div id=tab4> <a href="#tab4">How to</a>
      <div>Please click one of the tabs above.</div>
     </div>

    </div>
   </div>


</body>
</html>
