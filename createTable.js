import { sql } from './sql.js'

//Await espero o server rodar para criar a tabela no banco
await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );
`
