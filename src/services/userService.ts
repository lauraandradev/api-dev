import sqlite3 from "sqlite3";
import { User } from "../models/user";

const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco de dados conectado com sucesso!");
  }
});

export const getAllUsers = (callback: (err: Error | null, users: User[] | null) => void) => {
  db.all("SELECT * FROM Users", [], (err, rows: any[]) => {
    if (err) {
      callback(err, null);
      return;
    }
    const users = rows.map((row) => new User(row.Id, row.Name, row.Email, row.Password));
    callback(null, users);
  });
};

export const getUserById = (id: number, callback: (err: Error | null, user: User | null) => void) => {
  db.all("SELECT * FROM Users WHERE Id = ?", [id], (err, rows: any[]) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (rows.length === 0)
      callback(new Error("Usuário não encontrado"), null);

    const user = new User(rows[0].Id, rows[0].Name, rows[0].Email, rows[0].Password);
    callback(null, user);
  });
};

export const addUser = (
  name: string,
  email: string,
  password: string,
  callback: (err: Error | null, user: User | null) => void
) => {
  try {
    User.validate({ name, email });
  } catch (err) {
    return callback(err as Error, null);
  }

  const query = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
  db.run(query, [name, email, password], function (err: Error | null) {
    if (err) {
      callback(err, null);
      return;
    }
    const user = new User(this.lastID, name, email, password); // Cria uma instância de User
    callback(null, user);
  });
};
