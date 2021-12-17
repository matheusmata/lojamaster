module.exports = function(app) {

    var Vendas = app.models.vendas;

    var controller = {};

    
    controller.listaVendas = function(req, res){
        Vendas.find().populate('cliente').exec()
            .then(function(vendas) {
                res.json(vendas);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.obtemVenda = function(req, res){
        var _id = req.params.id;
        Vendas.findById(_id).exec()
            .then(function(venda){
                if(!venda){
                    res.status(404).json("Venda não encontrado");
                } else {
                    res.json(venda);
                }
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.removeVenda = function(req, res){
        var _id = req.params.id;
        Vendas.remove({"_id" : _id}).exec()
            .then(function(){
                res.end();
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.salvaVenda = function(req, res){
        var _id = req.body._id;

        if(_id){
            Vendas.findByIdAndUpdate(_id, req.body).exec()
                .then(function(venda){
                    res.json(venda);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        } else {
            Vendas.create(req.body)
                .then(function(venda){
                    Estoque.create({idProduto: venda.idProduto, tipo: 'Saida', quantidade: venda.quantidade});
                    res.status(201).json(venda);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    };

    return controller;
};