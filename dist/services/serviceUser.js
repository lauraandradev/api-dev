"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getAllUsers = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const userModel_1 = require("../models/userModel");
const db = new sqlite3_1.default.Database("./database.db", (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    }
    else {
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
        const users = rows.map((row) => new userModel_1.User(row.id, row.name, row.email)); // Mapeia os dados para instâncias de User
        callback(null, users);
    });
};
exports.getAllUsers = getAllUsers;
// Função para adicionar um novo usuário
const addUser = (name, email, callback) => {
    // Valida os dados antes de inserir no banco
    try {
        userModel_1.User.validate({ name, email });
    }
    catch (err) {
        return callback(err, null);
    }
    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.run(query, [name, email], function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        const user = new userModel_1.User(this.lastID, name, email); // Cria uma instância de User
        callback(null, user);
    });
};
exports.addUser = addUser;
