// functions/createPass.js
import generatePass from './generatePass.js';
import pkg from 'pg';  // Importa o módulo pg como um todo
const { Pool } = pkg; // Desestrutura para obter o Pool

// Configure o pool do PostgreSQL
const client = new Pool({
    user: 'passDBUser',         // Substitua pelo seu usuário
    host: 'db',                // Nome do serviço do banco de dados no Docker
    database: 'passDB', // Substitua pelo seu banco de dados
    password: 'passDBPass',  // Substitua pela sua senha
    // port: 5432,                // Porta padrão do PostgreSQL
});

// Função para gerar e salvar senhas
async function generateAndSavePassword(user, quant = 15) {
    try {
        const password = await generatePass(quant);
        const query = 'INSERT INTO passwords (username, password) VALUES ($1, $2) RETURNING *';
        const values = [user, password];
        const res = await client.query(query, values);
        return res.rows[0]; // Retorna a linha inserida
    } catch (err) {
        console.error('Erro ao criar senha:', err);
        throw err;
    }
}

export default generateAndSavePassword;
