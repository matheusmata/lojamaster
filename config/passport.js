var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
    // código anterior omitido
    var Usuario = mongoose.model('Usuario');

    passport.use(new LocalStrategy(
        function(username, password, done) {
            Usuario.findOne({login: username, senha: password}).exec()
                .then(function(usuario){
                    if(usuario){
                        return done(null, usuario);
                    } else {
                        return done(null, false, {message: 'Usuário ou senha inválidos.'});
                    }
                }, function(erro) {
                    console.error(erro);
                    return done(null, false, {message: 'Erro ao realizar o login.'});
                });
        }
    ));

    passport.serializeUser(function(usuario, done){
        done(null, usuario._id);
    });

    passport.deserializeUser(function(_id, done){
        Usuario.findById(_id).exec()
            .then(function(usuario){
                return done(null, usuario);
            });
    });
};