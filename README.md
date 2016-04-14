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
