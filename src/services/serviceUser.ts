import sqlite3 from "sqlite3";
import { User } from "../models/userModel";

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco de dados conectado com sucesso!");
  }
});

// Função para listar todos os usuários
export const getAllUsers = (callback: (err: Error | null, users: User[] | null) => void) => {
  db.all("SELECT * FROM Users", [], (err, rows: any[]) => {
    if (err) {
      callback(err, null);
      return;
    }
    const users = rows.map((row) => new User(row.id, row.name, row.email)); // Mapeia os dados para instâncias de User
    callback(null, users);
  });
};

// Função para adicionar um novo usuário
export const addUser = (
  name: string,
  email: string,
  callback: (err: Error | null, user: User | null) => void
) => {
  // Valida os dados antes de inserir no banco
  try {
    User.validate({ name, email });
  } catch (err) {
    return callback(err as Error, null);
  }

  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.run(query, [name, email], function (err: Error | null) {
    if (err) {
      callback(err, null);
      return;
    }
    const user = new User(this.lastID, name, email); // Cria uma instância de User
    callback(null, user);
  });
};
