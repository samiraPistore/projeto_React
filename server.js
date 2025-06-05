import express from "express" // Importa o Fastify
import { DatabasePostgres } from "./databasePostgres.js" // Importa o PostGress
import cors from "cors" // cors 
import './createTable.js';

const app = express();
app.use(cors());
app.use(express.json());

const database = new DatabasePostgres();

//GET /users
app.get('/users', async(req, res) =>{
    const users = await database.list();
    res.json(users);
});

//POST /users

app.post('/users', async(req, res) =>{
    const user = req.body;
    await database.create(user);
    res.status(201).send();
});

//PUT /users/:id

app.put('/users/:id', async(req, res) =>{
    const id = req.params.id;
    const user = req.body;
    await database.update(id, user);
    res.status(204).send();
});

//DELETE /users/:id
app.delete('/users/:id', async(req, res) => {
    const id = req.params.id;
    await database.delete(id);
    res.status(204).send();
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});