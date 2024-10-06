// functions/patchPass.js
import generatePass from './generatePass.js';
import pkg from 'pg';  
const { Pool } = pkg;

// Configure o pool do PostgreSQL
const client = new Pool({
    user: 'leonan',       
    host: 'db',               
    database: 'testeDB',
    password: 'leonanPASS', 
    port: 5432,               
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
            return null; 
        }
    } catch (err) {
        console.error('Erro ao atualizar senha:', err);
        throw err;
    }
}

export default patchPass;
