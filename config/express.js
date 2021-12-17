var express = require('express');
var load = require('express-load');
//var bodyParser = require('body-parser');
//var busboy = require('connect-busboy');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');
var flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);

module.exports = function(){
    var app = express();

    var store = new MongoDBStore({
        uri: 'mongodb://localhost/lojamaster',
        collection: 'sessions'
    });

    // Catch errors
    store.on('error', function(error) {
        assert.ifError(error);
        assert.ok(false);
    });

    app.set('port', 3000);

    app.use(express.static('./public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    //app.use(bodyParser.json({limit: '50mb', extended: true}));
    app.use(require('method-override')());
    app.use(cookieParser('ACVMMSL2016'));
    app.use(session({
        secret: 'ACVMMSL2016',
        name: 'SESSION',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: store,
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    app.get('*', function(req, res) {
        res.status(404).render('404');
    });

    return app;
};