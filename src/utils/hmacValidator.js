const crypto = require('crypto');

function validateHMAC(req) {
    const hmacReceived = req.headers['x-auth-signature'];
    const secretKey = process.env.SECRET_KEY; // A chave secreta deve ser armazenada no .env por segurança

    console.log('Chave secreta:', secretKey);
    // Log do corpo da mensagem recebida antes de JSON.stringify
    console.log('Corpo Recebido (Antes de JSON.stringify):', req.body);

    const body = JSON.stringify(req.body);

    // Log do corpo da mensagem recebida após JSON.stringify
    console.log('Corpo Recebido (Após JSON.stringify):', body);

    // Geração da assinatura HMAC usando a chave secreta e o corpo da mensagem
    const hmacGenerated = crypto.createHmac('sha256', secretKey)
        .update(body)
        .digest('base64');

    // Logs para depuração
    console.log('HMAC Gerado:', hmacGenerated);
    console.log('HMAC Recebido:', hmacReceived);

    // Comparação das assinaturas para verificar se são iguais
    return hmacGenerated === hmacReceived;
}

module.exports = validateHMAC;
