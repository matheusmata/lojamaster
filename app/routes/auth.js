var bodyParser = require('body-parser');
var passport = require('passport');

module.exports = function(app){
    app.post('/auth/local', bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), function(req, res) {
        res.redirect('/');
    });

    app.get('/auth/direto', bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), function(req, res, next) {
        req.body.username = req.query.usuario;
        req.body.password = req.query.senha;
        next();
    }, passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), function(req, res) {
        res.redirect('/');
    });

    app.get('/login', bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), function(req, res){
        res.render('login', {message: req.flash('error')});
    });

    app.get('/logout', bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), function(req, res){
        req.logOut();
        res.redirect('/');
    });
}