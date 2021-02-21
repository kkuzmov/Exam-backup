const express = require('express');
const handlebars = require('express-handlebars');
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');

function expressConfig(app){
    app.engine('hbs', handlebars({
        extname: 'hbs'
    }))
    
    app.set('view engine', 'hbs');
    
    app.use(express.static('public'));

    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    
    app.use(auth())
}
module.exports = expressConfig;


