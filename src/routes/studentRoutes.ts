import express from "express";
import { addStudent, getAllStudent } from "../services/studentService";

const router = express.Router();

// 🔹 Listar usuários
router.get("/", async (req, res, next) => {
    try {
        await getAllStudent((error, Student) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.json(Student);
        });
    } catch (error) {
        next(error);
    }
});

// 🔹 Criar usuário
router.post("/", async (req, res, next) => {
    try {
        const { name, school, time, schedule, value, contact, age } = req.body;
        await addStudent(name, school, time, schedule, value, contact, age, (error, student) => {
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(201).json(student);
        });
    } catch (error) {
        next(error);
    }
});

export default router;
