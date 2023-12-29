const crypto = require('crypto');

const body = '"{\\r\\n\\"user_id\\":\\"123456789\\",\\r\\n\\"user_name\\":\\"JoãoSilva\\",\\r\\n\\"user_username\\":\\"joaosilva\\",\\r\\n\\"user_credits\\":100.50,\\r\\n\\"user_bonus_credits\\":20.00,\\r\\n\\"user_birth_date\\":\\"10/10/1990\\",\\r\\n\\"user_cpf\\":\\"00011122233\\",\\r\\n\\"user_email\\":\\"joao.silva@example.com\\",\\r\\n\\"user_contact\\":\\"11999887766\\",\\r\\n\\"user_created_at\\":\\"01/01/2022\\",\\r\\n\\"user_locked\\":false,\\r\\n\\"user_affiliated\\":true,\\r\\n\\"user_affiliation\\":\\"affiliate123\\"\\r\\n}"'; // Substitua pelo corpo real da sua mensagem
const secretKey = '1234589abcd';

const hmac = crypto.createHmac('sha256', secretKey)
    .update(body)
    .digest('base64');

console.log(hmac);
