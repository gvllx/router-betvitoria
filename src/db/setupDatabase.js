const sqlite3 = require('sqlite3').verbose();

// Abre o banco de dados, se não existir, ele será criado
let db = new sqlite3.Database('./redirectLinks.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS redirect_urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT UNIQUE,
            url TEXT
            )`, (err) => {
            if (err) {
                // A tabela já existe
                console.error('Erro ao criar a tabela redirect_urls:', err.message);
            } else {
                // A tabela foi criada, inserir a URL de redirecionamento inicial
                console.log('Tabela redirect_urls criada com sucesso.');
                let insert = 'INSERT INTO redirect_urls (event_type, url) VALUES (?,?)';
                db.run(insert, ['user-registration', 'https://webhook.leadhunterexpert.com/webhook/e3422d94-d6a0-4caf-9a23-e305b41dd8fb']);
            }
        });
    }
});

// Fechar a conexão com o banco de dados
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conexão com o banco de dados fechada.');
});
