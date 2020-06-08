const express = require("express")  //  require é uma função que solicita o que está dentro do argumento
                                    //  no caso, express, e armazena na constante express 
const server = express()

//  pegar o banco de dados
const db = require("./database/db")

//  configurar pasta publica
//  essa linha que faz com que os arquivos da pasta publica sejam acessivel na src
server.use(express.static("public"))

//  habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//  utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {       //  pasta onde estão os htmls que serão utilizados
    express: server,
    noCache: true
}) 
//  com o nunjucks eu posso somente chamar as funções da forma chamada realmente
//ao inves dessa forma padrão:
/*server.get("/", (req, res) => {
    res.sendfile(__dirname + "/views/index.html")    //  resposta do servidor
})*/

//  configurar caminhos da minha aplicação
//  pagina inicial
//  req: Requisição
//  res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html")    //  resposta do servidor
})

server.get("/create-point", (req, res) => {

    //  req.query: Query Strigs da nossa url
    //  pega os dados que estão na url
    console.log(req.query)

    return res.render("create-point.html")    //  resposta do servidor
})

server.post("/savepoint", (req, res) => {

    //  req.body: o corpo do nosso formulário, não está habilitado por padrão, então tem que habilitar
    //  usou o req.body pois com o post nao da para ver o console log do req query, que é uma requisição get
    //  console.log(req.body)
    //  inserir dados no banco de dados

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")    //  incluido mais para que o cliente possa visualizar o erro
        }

        console.log("Cadastrado com sucesso")
        console.log(this) //    mostra os dados cadastrados, é a instancia do objeto
       
        return res.render("create-point.html", { saved: true }) //  recarrega a pagina create point
                                                                //  quando os dados forem enviados
    }

    db.run(query, values, afterInsertData)


})


server.get("/search", (req, res) => {   //  em cima é o nome que ficara no link, embaixo é o arquivo

    const search = req.query.search

    if(search == "") {
        //  pesquisa vazia
        return res.render("search-results.html", { total: 0 })    //  resposta do servidor

    }
    //  Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros")
        
        const total = rows.length

        console.log(rows)

        //  mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })    //  resposta do servidor
    })
   
})


//  ligar o servidor
server.listen(3000) //  3000 é a porta que o servidor irá ligar
