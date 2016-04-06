
var config = require('../config');

exports.index = function(req, res) {
 /*   res.render('index', {
        ReturnPort: process.env.PORT
    }); */
    res.redirect(config.buttonGeneratorPageUrl+"?ReturnPort="+ process.env.PORT); //This is only for debugging in visual studio
};

