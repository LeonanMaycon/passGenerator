// functions/patchPass.js
import generatePass from './generatePass.js';
import pkg from 'pg';  // Importa o módulo pg como um todo
const { Pool } = pkg; // Desestrutura para obter o Pool

// Configure o pool do PostgreSQL
const client = new Pool({
    user: 'leonan',         // Substitua pelo seu usuário
    host: 'db',                // Nome do serviço do banco de dados no Docker
    database: 'testeDB', // Substitua pelo seu banco de dados
    password: 'leonanPASS',  // Substitua pela sua senha
    port: 5432,                // Porta padrão do PostgreSQL
});


// Função para atualizar senhas
async function patchPass(user, quant = 15) {
    try {
        const newPassword = await generatePass(quant);
        const query = 'UPDATE passwords SET password = $1 WHERE username = $2 RETURNING *';
        const values = [newPassword, user];
        const res = await client.query(query, values);
        if (res.rowCount > 0) {
            return newPassword;
        } else {
            return null; // Usuário não encontrado
        }
    } catch (err) {
        console.error('Erro ao atualizar senha:', err);
        throw err;
    }
}

export default patchPass;
