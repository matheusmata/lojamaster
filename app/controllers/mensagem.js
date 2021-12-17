module.exports = function(app){
    var Mensagem = app.models.mensagem;

    var controller = {};

    controller.listaMensagensPorUsuario = function(req, res){
        var usuario1 = req.params.user1;
        var usuario2 = req.params.user2;

        console.log(usuario1);
        console.log(usuario2);
        Mensagem.find({$or:[{de: usuario1, para: usuario2},{de: usuario2, para: usuario1}]}).exec()
            .then(function(mensagens) {
                console.log(mensagens);
                res.json(mensagens);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.listaMensagens = function(req, res){
        Mensagem.find().exec()
            .then(function(mensagens) {
                res.json(mensagens);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.obtemMensagem = function(req, res){
        var _id = req.params.id;
        Mensagem.findById(_id).exec()
            .then(function(mensagem){
                if(!mensagem){
                    res.status(404).json("Mensagem não encontrada");
                } else {
                    res.json(mensagem);
                }
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.removeMensagem = function(req, res){
        var _id = req.params.id;
        Mensagem.remove({"_id" : _id}).exec()
            .then(function(){
                res.end();
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.salvaMensagem = function(req, res){
        var _id = req.body._id;

        if(_id){
            Mensagem.findByIdAndUpdate(_id, req.body).exec()
                .then(function(mensagem){
                    res.json(mensagem);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        } else {
            Mensagem.create(req.body)
                .then(function(mensagem){
                    res.status(201).json(mensagem);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    };

    return controller;
};