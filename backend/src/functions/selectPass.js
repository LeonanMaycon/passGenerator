// functions/selectPass.js
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

// Função para selecionar senhas
async function selectPass(user = null) {
    try {
        if (user) {
            const query = 'SELECT * FROM passwords WHERE username = $1';
            const values = [user];
            const res = await client.query(query, values);
            return res.rows.map(row => `Usuário: ${row.username}, Senha: ${row.password}`);
        } else {
            const query = 'SELECT * FROM passwords';
            const res = await client.query(query);
            return res.rows.map(row => `Usuário: ${row.username}, Senha: ${row.password}`);
        }
    } catch (err) {
        console.error('Erro ao selecionar senhas:', err);
        throw err;
    }
}

export default selectPass;
