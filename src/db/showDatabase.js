const sqlite3 = require('sqlite3').verbose();

// Abre o banco de dados SQLite
let db = new sqlite3.Database('./redirectLinks.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado ao banco de dados.');
    }
});

// Consulta que seleciona todos os registros da tabela redirect_urls
const query = `SELECT * FROM redirect_urls`;

db.all(query, [], (err, rows) => {
    if (err) {
        throw err;
    }
    // Exibe cada linha do resultado
    rows.forEach((row) => {
        console.log(row);
    });
});

// Fecha o banco de dados
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conexão com o banco de dados fechada.');
});
