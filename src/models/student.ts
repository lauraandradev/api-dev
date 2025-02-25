export class Student {
    id: number;
    name: string;
    school: string;
    time: number;
    schedule: string;
    value: number;
    contact: string;
    age: number;

    constructor(id: number, name: string, school: string, time: number, schedule: string, value: number, contact: string, age: number) {
        this.id = id;
        this.name = name;
        this.school = school;
        this.time = time;
        this.schedule = schedule;
        this.value = value;
        this.contact = contact;
        this.age = age;
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            school: this.school,
            time: this.time,
            schedule: this.schedule,
            value: this.value,
            contact: this.contact,
            age: this.age,
        };
    }

    static validate(data: { name: string; school: string, time: number, schedule: string }) {
        if (!data.name || !data.school || !data.time || !data.schedule) {
            throw new Error("Nome, escola e horário são obrigatórios!");
        }
    }
  }
  