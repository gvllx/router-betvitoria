const sqlite3 = require('sqlite3').verbose();

function getRedirectUrl(eventType) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./redirectLinks.db');
        db.get('SELECT url FROM redirect_urls WHERE event_type = ?', [eventType], (err, row) => {
            if (err) {
                db.close();
                reject(err);
            } else if (row) {
                db.close();
                resolve(row.url);
            } else {
                db.close();
                reject('URL não encontrada para o tipo de evento especificado');
            }
        });
    });
}

module.exports = getRedirectUrl;
