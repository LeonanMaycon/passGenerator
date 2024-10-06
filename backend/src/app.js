// src/app.js
import express from 'express';
import pkg from 'pg';  // Importa o módulo pg como um todo
import generateAndSavePassword from './functions/createPass.js';
import deletePass from './functions/deletePass.js';
import patchPass from './functions/patchPass.js';
import selectPass from './functions/selectPass.js';
const { Pool } = pkg; // Desestrutura para obter o Pool

const app = express();
const port = 80;

// Configure o pool do PostgreSQL
const pool = new Pool({
    user: 'leonan',         // Substitua pelo seu usuário
    host: 'db',                // Nome do serviço do banco de dados no Docker
    database: 'testeDB', // Substitua pelo seu banco de dados
    password: 'leonanPASS',  // Substitua pela sua senha
    port: 5432,                // Porta padrão do PostgreSQL
});
// Função para criar a tabela
const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS passwords (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        );
    `;
    try {
        await pool.query(query);
        console.log('Tabela "passwords" criada com sucesso.');
    } catch (err) {
        console.error('Erro ao criar tabela:', err);
    }
};

await createTable();

app.get('/', (req, res) => {
    let retorno = 'Gerador de senha, para gerar, use /passGenerator, use ?user=${valor} para criar. Caso queira especificar uma quantidade, use ?quant=${valor}<br>';
    retorno += 'Para buscar uma senha, basta usar /getPass, caso queira especificar o usuário use ?user=${valor}<br>';
    retorno += 'Para deletar uma senha, basta usar /delPass, especifique o usuário usando ?user=${valor}<br>';
    retorno += 'Para atualizar uma senha, basta usar /patchPass, especifique o usuário usando ?user=${valor}, caso queira especificar o tamanho da nova senha, use ?quant=${valor}<br>';

    res.send(retorno);
});

// Create new PASS
app.get('/passGenerator', async (req, res) => {
    let quant = req.query.quant ? parseInt(req.query.quant) : 15;
    let user = req.query.user;

    if (!user) {
        return res.send('Por favor, insira um usuário usando ?user=${valor}');
    }

    try {
        let pass = await generateAndSavePassword(user, quant);
        res.send(`Senha gerada para o usuário '${user}': ${pass.password}`);
    } catch (err) {
        res.status(500).send(`Erro ao gerar senha: ${err.message}`);
    }
});

// GET Pass
app.get('/getPass', async (req, res) => {
    let user = req.query.user;

    try {
        let pass = await selectPass(user);
        if (pass.length > 0) {
            res.send(pass.join('<br>'));
        } else {
            res.status(404).send(`Nenhuma senha encontrada para o usuário '${user}'`);
        }
    } catch (err) {
        res.status(500).send(`Erro ao buscar senha: ${err.message}`);
    }
});

// DELETE Pass
app.get('/delPass', async (req, res) => {
    let user = req.query.user;

    if (!user) {
        return res.send('Nenhum usuário indicado, por favor use query ?user=${exemplo} para deletar!');
    }

    try {
        let result = await deletePass(user);
        if (result > 0) {
            res.status(200).send(`A senha do usuário '${user}' foi deletada!`);
        } else {
            res.status(404).send(`Usuário '${user}' não encontrado.`);
        }
    } catch (err) {
        res.status(500).send(`Erro ao deletar usuário: ${err.message}`);
    }
});

// UPDATE Pass
app.get('/patchPass', async (req, res) => {
    const user = req.query.user;
    const quant = req.query.quant ? parseInt(req.query.quant) : 15;

    if (!user) {
        return res.send('Nenhum usuário indicado, por favor use query ?user=${exemplo} para atualizar!');
    }

    try {
        const newPass = await patchPass(user, quant);
        if (newPass) {
            res.status(200).send(`Nova senha para o usuário '${user}' foi gerada: ${newPass}`);
        } else {
            res.status(404).send(`Usuário '${user}' não encontrado.`);
        }
    } catch (err) {
        res.status(500).send(`Erro ao atualizar senha: ${err.message}`);
    }
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
