import express from "express";
import bodyParser from "body-parser";
import { addUser, getAllUsers } from "./services/serviceUser";

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// 🚀 Rota para listar todos os usuários
app.get("/users", (req, res) => {
  getAllUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(users?.map((user) => user.toJSON())); // Retorna os dados no formato JSON
  });
});

// 🚀 Rota para adicionar um novo usuário
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  addUser(name, email, (err, user) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json(user?.toJSON()); // Retorna o usuário recém-criado
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
