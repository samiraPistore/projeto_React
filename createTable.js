import { sql } from './sql.js'

//Cria a tabela no Banco
await sql`
    CREATE TABLE users (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
`;
