# Requirements: 

Composer for PHP (https://getcomposer.org/download/). Composer is a package manager for PHP which is similar to npm for node/javascript.

IIS (Windows) configuration. Follow this instruction: http://fatfreeframework.com/routing-engine#SampleIISConfiguration

If you are using Apache (Linux). Follow this instruction: http://fatfreeframework.com/routing-engine#SampleApacheConfiguration

In config.json

    "WebAppSettings": {
      "hostname": "a.local.com",
      "scheme": "http",
      "port": "80",
      "platform": {
        "name": "php",
        "fileExtension": "php"
      }
    },
    
    
In config.js

Change this line

    config.buttonGeneratorPageUrl = "http://" + config.WebAppSettings.hostname + ':' + config.WebAppSettings.port + '/' + "Auth.JS/aspx/AllInOne.aspx";

to this line

    config.buttonGeneratorPageUrl = "http://" + config.WebAppSettings.hostname + ':' + config.WebAppSettings.port + '/';


# Install 

Step 1.

    $ cd Auth.JS/platforms/php

    php composer.phar install

This command installs required library in the `composer.json` file.

Step 2.

Set up an IIS or Apache site, and point the site index to Auth.JS/platforms/php

Step 3. 

Run `node app`

Step 4. 

Visit `a.local.com`

Click login
