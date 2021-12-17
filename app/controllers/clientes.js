module.exports = function(app) {

    var Clientes = app.models.clientes;

    var controller = {};

    
    controller.listaClientes = function(req, res){
        Clientes.find().exec()
            .then(function(clientes) {
                res.json(clientes);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.obtemCliente = function(req, res){
        var _id = req.params.id;
        Clientes.findById(_id).exec()
            .then(function(cliente){
                if(!cliente){
                    res.status(404).json("Cliente não encontrado");
                } else {
                    res.json(cliente);
                }
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.removeCliente = function(req, res){
        var _id = req.params.id;
        Clientes.remove({"_id" : _id}).exec()
            .then(function(){
                res.end();
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.salvaCliente = function(req, res){
        var _id = req.body._id;

        if(_id){
            Clientes.findByIdAndUpdate(_id, req.body).exec()
                .then(function(cliente){
                    res.json(req.body);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        } else {
            Clientes.create(req.body)
                .then(function(cliente){
                    res.status(201).json(req.body);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    };

    return controller;
};