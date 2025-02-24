import { Pool } from "pg";
import { User } from "../models/userModel";

const pool = new Pool({
  user: "turmy_user",
  host: "dpg-cutlorggph6c73b43c10-a.oregon-postgres.render.com", // ou o host do seu banco
  database: "turmy",
  password: "L2mkjNdwAs1p9Ba0u1YYjsGxGa189TK7",
  port: 5432, // Porta padrão do PostgreSQL
});

// Função para listar todos os usuários
export const getAllUsers = async (callback: (err: Error | null, users: User[] | null) => void) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    const users = result.rows.map((row) => new User(row.id, row.name, row.email));
    callback(null, users);
  } catch (err) {
    callback(err as Error, null);
  }
};

// Função para adicionar um novo usuário
export const addUser = async (
  name: string,
  email: string,
  callback: (err: Error | null, user: User | null) => void
) => {
  try {
    User.validate({ name, email });

    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const values = [name, email];
    const result = await pool.query(query, values);
    
    const user = new User(result.rows[0].id, result.rows[0].name, result.rows[0].email);
    callback(null, user);
  } catch (err) {
    callback(err as Error, null);
  }
};
