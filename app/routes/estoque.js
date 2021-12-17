var bodyParser = require('body-parser');

function verificaAutenticacao(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function(app){
    var controller = app.controllers.estoque;

    app.route('/estoques/quantidade/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemQuantidadeEstoque);

    app.route('/estoques')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.listaEstoques)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaEstoque);
    app.route('/estoques/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemEstoque)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaEstoque)
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeEstoque);

    app.route('/estoque')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemEstoque)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaEstoque) 
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeEstoque);


    app.route('/estoque/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemEstoque)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaEstoque)
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeEstoque);
};