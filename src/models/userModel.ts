// Modelo de usuário
export class User {
    id: number;
    name: string;
    email: string;
  
    constructor(id: number, name: string, email: string) {
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
    static validate(data: { name: string; email: string }) {
      if (!data.name || !data.email) {
        throw new Error("Nome e email são obrigatórios!");
      }
      // Aqui você pode adicionar mais validações conforme necessário (ex: formato do email)
    }
  }
  