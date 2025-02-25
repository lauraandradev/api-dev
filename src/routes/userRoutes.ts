import express from "express";
import { addUser, getAllUsers, getUserById } from "../services/userService";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        await getAllUsers((error, users) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.json(users);
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id.toString());

        await getUserById(userId, (error, user) => {
            if (isNaN(userId)) {
                return res.status(400).json({ error: "O ID deve ser um número válido." });
            }
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            res.json(user);
        });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        await addUser(name, email, password, (error, user) => {
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(201).json(user);
        });
    } catch (error) {
        next(error);
    }
});

export default router;
