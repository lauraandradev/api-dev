const sqlite3 = require("sqlite3").verbose();
const User = require("./userModel");  // Importa o modelo User
const db = new sqlite3.Database("./database/apidev.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco de dados conectado com sucesso!");
  }
});

// Função para listar todos os usuários
const getAllUsers = (callback) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }
    const users = rows.map((row) => new User(row.id, row.name, row.email)); // Mapeia os dados para instâncias de User
    callback(null, users);
  });
};

// Função para adicionar um novo usuário
const addUser = (name, email, callback) => {
  // Valida os dados antes de inserir no banco
  try {
    User.validate({ name, email });
  } catch (err) {
    return callback(err, null);
  }

  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.run(query, [name, email], function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    const user = new User(this.lastID, name, email); // Cria uma instância de User
    callback(null, user);
  });
};

module.exports = {
  getAllUsers,
  addUser,
};
