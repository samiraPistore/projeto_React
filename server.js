import fastify from "fastify" // Importa o Fastify
import { DatabasePostgres } from "./databasePostgres.js"  // Importa o PostGress
import cors from "@fastify/cors" // cors 


// Cria uma instância do servidor Fastify
const server = fastify();


//const database = new DatabaseMemory()

//métodos HTTP
await server.register(cors, {
    origin: '*',
    methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
})


// Cria uma instância do banco de dados PostgreSQL
const database = new DatabasePostgres();


//request pega informções do user
server.post('/users', async (request, reply) => {
    const { name, email} = request.body


    await database.create({
        name,
        email,
    })


    return reply.status(201).send()
})


//Rota Get
server.get('/users', async (request) => {
    const search = request.query.search


    const users = await database.list(search)


    return users
})

//Rota Get pelo id
server.get('/users/:id', async (request) => {
    const userId = request.params.id


    const user = await database.getById(userId)


    return user
})


//Rota para editar pelo id
server.put('/users/:id', async (request, reply) => {
    const userId = request.params.id
    const { name, email} = request.body


    await database.update(userId, {
        name,
        email,
    })


    return reply.status(204).send() //resposta teve sucesso mas não retorna um conteúdo
})

//Rota editar parcialmente
server.patch('/users/:id', async (request, reply) => {
    const userId = request.params.id
    const { name, email } = request.body


    const existingUser = await database.getById(userId)


    if (!existingUser) {
        return reply.status(404).send({ error: 'Usuário não encontrado' })
    }


    await database.update(userId, {
        name: name ?? existingUser.name,
        email: email ?? existingUser.email
    })


    return reply.status(204).send()
})


//Rota para deletar 
server.delete('/users/:id', async (request, reply) => {
    const userId = request.params.id


   await database.delete(userId)


    return reply.status(204).send()
})


server.listen({
    port: process.env.PORT ?? 3002,
})
