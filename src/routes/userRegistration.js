const express = require('express');
const axios = require('axios');
const validateHMAC = require('../utils/hmacValidator');
const getRedirectUrl = require('../db/database');
const router = express.Router();

router.post('/user-registration', async (req, res) => {
    console.log('Requisição recebida para /user-registration'); // Debug: Confirma recebimento da requisição

    // Validação da assinatura HMAC
    if (!validateHMAC(req)) {
        console.log('Falha na validação HMAC'); // Debug: Log se a validação falhar
        return res.status(401).json({ "processed": false, "error": "Assinatura inválida." });
    }

    try {
        console.log('Buscando URL de redirecionamento'); // Debug: Log antes da busca da URL
        const redirectUrl = await getRedirectUrl('user-registration');
        console.log('URL de redirecionamento encontrada:', redirectUrl); // Debug: Log da URL encontrada

        console.log('Redirecionando para:', redirectUrl); // Debug: Log antes do redirecionamento
        const response = await axios.post(redirectUrl, req.body);
        console.log('Resposta do redirecionamento:', response); // Debug: Log da resposta do redirecionamento

        return res.status(200).json({ "processed": true });
    } catch (error) {
        console.error('Erro durante o redirecionamento:', error);
        return res.status(500).json({ "processed": false, "error": "Erro ao redirecionar" });
    }
});

module.exports = router;
