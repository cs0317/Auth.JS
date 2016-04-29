# Auth.JS

## Install

    npm install

### Setup webserver 

Windows: ASP.NET 

    ASPX_setup.cmd
    
### Setting the host file

Add an entry for `a.local.com` to the host file.

Windows: `%systemroot%\system32\drivers\etc\hosts`

    127.0.0.1 a.local.com

Linux: `/etc/hosts`

    127.0.0.1 a.local.com
    
## Getting started
By default, the example node server listens on the port 3000.

    node app
    EXPRESS SERVER LISTENING ON PORT 3000
    
Note: you must allow incoming traffic to the port 3000 for OAuth to work.

## TODO

[4/29/16, 2:09:07 PM] Phuong Cao: - Write documentation on integrating Auth.JS and a platform
[4/29/16, 2:09:33 PM] Phuong Cao: - Implement other OAuth services such as LinkedIn
[4/29/16, 2:09:56 PM] Phuong Cao: - Implement or integrate transaction verification to Auth.JS
[4/29/16, 2:10:17 PM] Phuong Cao: - Write documentation on how to deploy Auth.JS to a server
