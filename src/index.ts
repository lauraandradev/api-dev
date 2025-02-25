import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import studentRoutes from "./routes/studentRoutes";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRoutes);
app.use("/students", studentRoutes);

// Middleware global de erro
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Ocorreu um erro no servidor." });
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});
