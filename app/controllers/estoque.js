module.exports = function(app) {

    var Estoque = app.models.estoque;

    var controller = {};

    
    controller.listaEstoques = function(req, res){
        Estoque.find().populate('produto').exec()
            .then(function(estoques) {
                res.json(estoques);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.obtemEstoque = function(req, res){
        var _id = req.params.id;
        Estoque.findById(_id).exec()
            .then(function(estoque){
                if(!estoque){
                    res.status(404).json("Estoque não encontrado");
                } else {
                    res.json(estoque);
                }
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.obtemQuantidadeEstoque = function(req, res){
        var idProduto = req.params.id;
        Estoque.find({produto: idProduto}).exec()
            .then(function(estoques){
                var quantidadeEstoque = 0;
                for(var i = 0, len = estoques.length; i < len; i++){
                    if(estoques[i].tipo == 'entrada') {
                        quantidadeEstoque = quantidadeEstoque + estoques[i].quantidade;
                    } else {
                        quantidadeEstoque = quantidadeEstoque - estoques[i].quantidade;
                    }
                }
                obj = {quantidade: quantidadeEstoque};
                res.json(obj);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.removeEstoque = function(req, res){
        var _id = req.params.id;
        Estoque.remove({"_id" : _id}).exec()
            .then(function(){
                res.end();
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.salvaEstoque = function(req, res){
        var _id = req.body._id;

        if(_id){
            Estoque.findByIdAndUpdate(_id, req.body).exec()
                .then(function(estoque){
                    res.json(req.body);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        } else {
            Estoque.create(req.body)
                .then(function(estoque){
                    res.status(201).json(req.body);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    };

    return controller;
};