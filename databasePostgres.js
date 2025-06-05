import { randomUUID } from "node:crypto" // Importa função para gerar UUIDs aleatório
import { sql } from "./sql.js" // Importa instâncias para executar as queries


export class DatabasePostgres{
    async list(){
        try{
            const result = await sql`SELECT * FROM users;`;
            return result;
        }catch (err){
            console.log("Erro ao listar usuários: ", err);
            return [];
        }
    }
    //cria usuário novo
    async create(user){
        const userId = randomUUID();
        const { name, email } = user;

        await sql`
            INSERT INTO users (id, name, email) VALUES (${userId}, ${name}, ${email})
            `;
    }

    //Atualiza os dados do usuário pelo id
    async update(id, user){
        const { name, email } = user;

        await sql`
        UPDATE users 
        SET name = ${name}, email = ${email} 
        WHERE id = ${id}
            `;
    }

    //Deleta por id
    async delete(id){
        await sql`DELETE FROM users WHERE id =${id}`
    }
   
}
