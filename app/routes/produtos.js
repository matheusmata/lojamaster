var bodyParser = require('body-parser');

function verificaAutenticacao(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function(app){
    var controller = app.controllers.produtos;

    app.route('/produtos')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.listaProdutos)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaProduto);
    app.route('/produtos/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemProduto)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaProduto)
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeProduto);

    app.route('/produto')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemProduto)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaProduto) 
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeProduto);


    app.route('/produto/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemProduto)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaProduto)
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeProduto);
};