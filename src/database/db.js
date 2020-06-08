//  importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose() // configura o sqlite3, avisando que quer ver mensagens no terminal sempre que acontecer alguma coisa

//  criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")  //   instancia de um objeto
                                                               //   ele entende que vai ter que criar um banco de dados nesse caminho

//  utilizar o objeto de banco de dados, para nossa operações
// db.serialize( () => {   // serialize: vai rodar uma sequencia de codigos
//     //  Criar uma tabela com comandos sql
//     db.run(`        
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name, TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `) //   usa crase para quebra de linha

//     //  Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1507560461415-997cd00bfd45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "Papersider",
//         "Guilherme Gembala, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"    
//     ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)

    //  Consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros")
    //     console.log(rows)
    // })

    //  Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [8], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso")
    // })


// }) 

module.exports = db

