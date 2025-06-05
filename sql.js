//import de dependências neon 
import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config();
// Inicializa a conexão com o banco de dados
export const sql = postgres(process.env.DATABASE_URL, {
    ssl: "require" //require para as requisões do servidor
})