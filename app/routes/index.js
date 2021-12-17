var bodyParser = require('body-parser');

function verificaAutenticacao(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.render('login', {message: req.flash('error')});
    }
}

module.exports = function(app) {
    app.get('/', bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, function(req, res){
        var login = '';
        if(req.user){
            login = req.user.login;
        }
        res.render('index', {"usuarioLogado": login});
    });
};