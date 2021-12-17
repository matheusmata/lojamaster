var request = require('supertest');
var moment = require('moment');
var chalk = require('chalk');

describe('Testando BACKEND', function () {
    var agent = request.agent('http://localhost:3000');

    before(function(done){
        this.timeout(15000);
        agent
            .get('/auth/direto?usuario=MLSuporte&senha=qweasd123')
            .end(function(err, res) {
                if (err) return done(err);

                done();
            });
    });

    after(function(){
        this.timeout(15000);
        agent
            .get('/logout')
            .end(function(err, res) {
                if (err) return done(err);

                done();
            });
    });

    it('404 Para Caminhos Incorretos', function (done) {
        agent
            .get('/foo/bar')
            .expect(404, done);
    });

    describe('DASHBOARD - Tela Inicial', function(){
        it('DASHBOARD - Acessar a lista de laudos dos últimos 7 dias', function(done){
            this.timeout(15000);
            var dataIni = moment().subtract(7, 'days').format('YYYY-MM-DD');
            var dataFim = moment().format('YYYY-MM-DD');

            agent
                .get('/laudos/filadeespera/bydate/' + dataIni + '/' + dataFim)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err) return done(err);

                    var indicadores = {
                        qntInicial: 0,
                        qntDigitacao: 0,
                        qntElaborado: 0,
                        qntAssinado: 0,
                        qntEntregue: 0
                    };

                    res.body.forEach(function(value){
                        if((value.STATUS == '') || (value.STATUS == null)) {
                            indicadores.qntInicial++;
                        } else if(value.STATUS == 'Elaborado') {
                            indicadores.qntElaborado++;
                        } else if(value.STATUS == 'Digitacao') {
                            indicadores.qntDigitacao++;
                        } else if(value.STATUS == 'Assinado') {
                            indicadores.qntAssinado++;
                        } else if(value.STATUS == 'Entregue') {
                            indicadores.qntEntregue++;
                        }
                    });

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS INICIAL:   ') + chalk.yellow(indicadores.qntInicial));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS DIGITACAO: ') + chalk.yellow(indicadores.qntDigitacao));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS ELABORADO: ') + chalk.yellow(indicadores.qntElaborado));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS ASSINADO:  ') + chalk.yellow(indicadores.qntAssinado));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS ENTREGUE:  ') + chalk.yellow(indicadores.qntEntregue));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    done();
                });
        });
    });

    describe('CADASTRO TEXTOS HTML', function(){
        var idTexto = 0;
        var textoHTML = {};

        it('CADASTRO TEXTOS HTML - Acessar a lista de textos HTML [SELECT ALL]', function(done){
            this.timeout(15000);

            agent
                .get('/textoHTML')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err) return done(err);

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' Quantidade de Textos HTML:   ') + chalk.yellow(res.body.length));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar a quantidade de textos HTML. ERRO: ' + ex));
                    }

                    idTexto = res.body[0].ID_TEXTO_HTML;

                    done();
                });
        });

        it('CADASTRO TEXTOS HTML - Acessar o primeiro registro da lista de textos HTML [SELECT ONE]', function(done){
            agent
                .get('/textoHTML/' + idTexto)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err) return done(err);

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' Descrição do Texto Acessado:   ') + chalk.yellow(res.body.DESCRICAO));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível acessar a descrição do texto HTML acessado. ERRO: ' + ex));
                    }

                    textoHTML = res.body;

                    done();
                });
        });

        it('CADASTRO TEXTOS HTML - Incluir um Texto HTML clone do registro usado anteriormente gerando um novo ID_TEXTO_HTML [INSERT]', function(done){
            delete textoHTML.ID_TEXTO_HTML;
            textoHTML.DESCRICAO = 'Teste de Inclusão ' + moment().format('YYYY-MM-DD HH:mm:ss');

            agent
                .post('/textoHTML')
                .send(textoHTML)
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err) return done(err);

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' ID_TEXTO_HTML gerado da inclusão:   ') + chalk.yellow(res.body.ID_TEXTO_HTML));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível acessar o ID_TEXTO_HTML gerado da inclusão. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' DESCRICAO do texto gerado da inclusão:   ') + chalk.yellow(res.body.DESCRICAO));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível acessar a DESCRICAO do texto gerado da inclusão. ERRO: ' + ex));
                    }

                    textoHTML = res.body;

                    done();
                });
        });

        it('CADASTRO TEXTOS HTML - Atualizar a descricao do texto incluído anteriormente [UPDATE]', function(done){
            textoHTML.DESCRICAO = 'Teste de Alteração ' + moment().format('YYYY-MM-DD HH:mm:ss');

            agent
                .post('/textoHTML')
                .send(textoHTML)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err) return done(err);

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' ID_TEXTO_HTML do texto atualizado:   ') + chalk.yellow(res.body.ID_TEXTO_HTML));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível acessar o ID_TEXTO_HTML. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' DESCRICAO do texto atualizado:   ') + chalk.yellow(res.body.DESCRICAO));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível acessar o ID_TEXTO_HTML. ERRO: ' + ex));
                    }

                    textoHTML = res.body;

                    done();
                });
        });

        it('CADASTRO TEXTOS HTML - Deletar o texto incluído anteriormente [DELETE]', function(done){
            agent
                .del('/textoHTML/' + textoHTML.ID_TEXTO_HTML)
                .expect(200)
                .end(function(err, res){
                    if (err) return done(err);

                    done();
                });
        });
    });

    describe('LAUDOS - Fila de Espera', function(){
        it('LAUDOS - Acessar a lista de laudos dos últimos 7 dias', function(done){
            this.timeout(15000);
            var dataIni = moment().subtract(7, 'days').format('YYYY-MM-DD');
            var dataFim = moment().format('YYYY-MM-DD');

            agent
                .get('/laudos/filadeespera/bydate/' + dataIni + '/' + dataFim)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err) return done(err);

                    var indicadores = {
                        qntInicial: 0,
                        qntDigitacao: 0,
                        qntElaborado: 0,
                        qntAssinado: 0,
                        qntEntregue: 0
                    };

                    res.body.forEach(function(value){
                        if((value.STATUS == '') || (value.STATUS == null)) {
                            indicadores.qntInicial++;
                        } else if(value.STATUS == 'Elaborado') {
                            indicadores.qntElaborado++;
                        } else if(value.STATUS == 'Digitacao') {
                            indicadores.qntDigitacao++;
                        } else if(value.STATUS == 'Assinado') {
                            indicadores.qntAssinado++;
                        } else if(value.STATUS == 'Entregue') {
                            indicadores.qntEntregue++;
                        }
                    });

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS INICIAL:   ') + chalk.yellow(indicadores.qntInicial));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS DIGITACAO: ') + chalk.yellow(indicadores.qntDigitacao));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS ELABORADO: ') + chalk.yellow(indicadores.qntElaborado));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS ASSINADO:  ') + chalk.yellow(indicadores.qntAssinado));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    try {
                        console.log('        ' + chalk.green('↓') +  chalk.gray(' STATUS ENTREGUE:  ') + chalk.yellow(indicadores.qntEntregue));
                    } catch (ex) {
                        console.log('        ' + chalk.red('×') +  chalk.gray(' Não foi possível determinar as estatisticas de laudo. ERRO: ' + ex));
                    }

                    done();
                });
        });
    });
});