// functions/deletePass.js
import pkg from 'pg';  // Importa o módulo pg como um todo
const { Pool } = pkg; // Desestrutura para obter o Pool

// Configure o pool do PostgreSQL
const client = new Pool({
    user: 'passDBUser',      
    host: 'db',         
    database: 'passDB', 
    password: 'passDBPass', 
    port: 5432,            
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
