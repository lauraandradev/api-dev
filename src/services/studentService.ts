import sqlite3 from "sqlite3";
import { Student } from "../models/student";

const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Banco de dados conectado com sucesso!");
    }
});

export const getAllStudent = (callback: (err: Error | null, students: Student[] | null) => void) => {
    db.all("SELECT * FROM Students", [], (err, rows: any[]) => {
        if (err) {
            callback(err, null);
            return;
        }
        const students = rows.map((row) => new Student(row.Id, row.Name, row.School, row.Time, row.Schedule, row.Value, row.Contact, row.Age));
        callback(null, students);
    });
};

export const addStudent = (
    name: string,
    school: string,
    time: number,
    schedule: string,
    value: number,
    contact: string,
    age: number,
  callback: (err: Error | null, student: Student | null) => void
) => {
    try {
        Student.validate({ name, school, time, schedule });
    } catch (err) {
        return callback(err as Error, null);
    }

    const query = "INSERT INTO Students (name, school, time, schedule, value, contact, age) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.run(query, [name, school, time, schedule, value, contact, age], function (err: Error | null) {
        if (err) {
            callback(err, null);
            return;
        }
        const student = new Student(this.lastID, name, school, time, schedule, value, contact, age); // Cria uma instância de student
        callback(null, student);
    });
};