"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const serviceUser_1 = require("./services/serviceUser");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware para processar JSON
app.use(body_parser_1.default.json());
// 🚀 Rota para listar todos os usuários
app.get("/users", (req, res) => {
    (0, serviceUser_1.getAllUsers)((err, users) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(users === null || users === void 0 ? void 0 : users.map((user) => user.toJSON())); // Retorna os dados no formato JSON
    });
});
// 🚀 Rota para adicionar um novo usuário
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    (0, serviceUser_1.addUser)(name, email, (err, user) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json(user === null || user === void 0 ? void 0 : user.toJSON()); // Retorna o usuário recém-criado
    });
});
// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
