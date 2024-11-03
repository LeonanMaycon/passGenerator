// functions/deletePass.js
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


// Função para deletar senhas
async function deletePass(user) {
    try {
        const query = 'DELETE FROM passwords WHERE username = $1';
        const values = [user];
        const res = await client.query(query, values);
        return res.rowCount; // Retorna o número de linhas afetadas
    } catch (err) {
        console.error('Erro ao deletar senha:', err);
        throw err;
    }
}

export default deletePass;
