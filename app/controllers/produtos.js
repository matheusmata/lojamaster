module.exports = function(app) {

    var Produtos = app.models.produtos;
    var Estoque = app.models.estoque;

    var controller = {};

    
    controller.listaProdutos = function(req, res){
        Produtos.find().exec()
            .then(function(produtos) {
                res.json(produtos);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.obtemProduto = function(req, res){
        var _id = req.params.id;
        Produtos.findById(_id).exec()
            .then(function(produto){
                if(!produto){
                    res.status(404).json("Produto não encontrado");
                } else {
                    res.json(produto);
                }
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.removeProduto = function(req, res){
        var _id = req.params.id;
        Produtos.remove({"_id" : _id}).exec()
            .then(function(){
                res.end();
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.salvaProduto = function(req, res){
        var _id = req.body._id;

        if(_id){
            Produtos.findByIdAndUpdate(_id, req.body).exec()
                .then(function(produto){
                    res.json(req.body);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        } else {
            Produtos.create(req.body)
                .then(function(produto){
                    res.status(201).json(req.body);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    };

    return controller;
};