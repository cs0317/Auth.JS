<html>

<head>
</head>


<body>

<%@ Page Language="C#" %>

<script src="..\includes\utils.js">
</script>
<script>
     function open_nonPopup() {
		window.open("/Auth.JS/aspx/non-popup-buttons.aspx?ReturnPort="+getQueryString('ReturnPort'),'window_nonPopup');
	 }
</script>
<button onclick="open_nonPopup();">Non-popup buttons</button> <p>
<button onclick="open_nonPopup();">Popup buttons</button> <p>
<button onclick="open_nonPopup();">Account linking buttons</button> <p>
</body>
</html>
