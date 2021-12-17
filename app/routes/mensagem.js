var bodyParser = require('body-parser');

function verificaAutenticacao(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function(app){
    var controller = app.controllers.mensagem;
    app.route('/mensagens/:user1/:user2')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.listaMensagensPorUsuario);
    app.route('/mensagens')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.listaMensagens)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaMensagem);
    app.route('/mensagens/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemMensagem)
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeMensagem);
};