const express = require('express');
const bodyParser = require('body-parser');
const userRegistrationRouter = require('./src/routes/userRegistration');
const validateHMAC = require('./src/utils/hmacValidator');
const getRedirectUrl = require('./src/db/database');
const axios = require('axios');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

app.post('/user-registration', async (req, res) => {
    // // Validação da assinatura HMAC
    // if (!validateHMAC(req)) {
    //     console.log('Falha na validação HMAC'); // Debug: Log se a validação falhar
    //     return res.status(401).json({ "processed": false, "error": "Assinatura inválida." });
    // }

    try {
        const redirectUrl = 'https://webhook.leadhunterexpert.com/webhook/e3422d94-d6a0-4caf-9a23-e305b41dd8fb'
        const response = await axios.post(redirectUrl, req.body);
        return res.status(200).json({ "processed": true });
    } catch (error) {
        return res.status(500).json({ "processed": false, "error": "Erro ao redirecionar" });
    }
});

app.post('/deposit-request', async (req, res) => {
    console.log('Requisição recebida para /deposit-request');
    try {
        const redirectUrl = 'https://webhook.leadhunterexpert.com/webhook/f8c08223-93f4-4443-a9cd-af9bf3c867ae'; // Substitua pela URL apropriada
        const response = await axios.post(redirectUrl, req.body);
        res.status(200).json({ "processed": true });
    } catch (error) {
        res.status(500).json({ "processed": false, "error": "Erro ao redirecionar para depósito" });
    }
});

app.post('/deposit-confirmation', async (req, res) => {
    try {
        const redirectUrl = 'https://webhook.leadhunterexpert.com/webhook/01ddfbf1-8a7c-4875-9e15-49297de8c995'; // Substitua pela URL apropriada
        const response = await axios.post(redirectUrl, req.body);
        res.status(200).json({ "processed": true });
    } catch (error) {
        res.status(500).json({ "processed": false, "error": "Erro ao redirecionar para confirmação de depósito" });
    }
});

// Rota de teste
app.get('/test', (req, res) => {
    res.send('Endpoint de teste funcionando');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acessar o endpoint de registro de usuário em: http://localhost:${PORT}/user-registration`);
});
