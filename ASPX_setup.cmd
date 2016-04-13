%systemroot%\system32\inetsrv\AppCmd.exe ADD vdir /app.name:"Default Web Site/" /path:/Auth.JS/images /physicalPath:%cd%\images
%systemroot%\system32\inetsrv\AppCmd.exe ADD vdir /app.name:"Default Web Site/" /path:/Auth.JS/includes /physicalPath:%cd%\includes
%systemroot%\system32\inetsrv\AppCmd.exe ADD vdir /app.name:"Default Web Site/" /path:/Auth.JS/aspx /physicalPath:%cd%\platforms\aspx