"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// Modelo de usuário
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    // Método para representar o usuário em formato JSON
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
        };
    }
    // Validar os dados do usuário
    static validate(data) {
        if (!data.name || !data.email) {
            throw new Error("Nome e email são obrigatórios!");
        }
        // Aqui você pode adicionar mais validações conforme necessário (ex: formato do email)
    }
}
exports.User = User;
