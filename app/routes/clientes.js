var bodyParser = require('body-parser');

function verificaAutenticacao(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function(app){
    var controller = app.controllers.clientes;

    app.route('/clientes')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.listaClientes)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaCliente);
    app.route('/clientes/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemCliente)
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeCliente);

   app.route('/cliente')
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaCliente) 
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeCliente);


    app.route('/cliente/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemCliente)
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaCliente)
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeCliente);
 

};