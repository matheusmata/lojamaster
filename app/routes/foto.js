var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: './tmp/'});

function verificaAutenticacao(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function(app){
    var controller = app.controllers.foto;

    app.route('/fotos/upload/:idPaciente')
        .post(upload.single('file'), verificaAutenticacao, controller.gravaArquivo);
    app.route('/fotos/:idPaciente')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.listaFotos);
    app.route('/fotos')
        .post(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.salvaFoto);
    app.route('/fotos/image/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemFoto);
    app.route('/fotos/image/thumb/:id')
        .get(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.obtemFotoThumb);
    app.route('/fotos/:id')
        .delete(bodyParser.urlencoded({limit: '50mb', extended: true}), bodyParser.json({limit: '50mb', extended: true}), verificaAutenticacao, controller.removeFoto);
};