// functions/selectPass.js
import pkg from 'pg';  
const { Pool } = pkg;

// Configure o pool do PostgreSQL
const client = new Pool({
    user: 'passDBUser',        
    host: 'db',              
    database: 'passDB', 
    password: 'passDBPass',  
    port: 5432,              
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
