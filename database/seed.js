// database/seed.js

import { availableClasses } from '../assets/data/availableClasses';
import { prerequisites } from '../assets/data/prerequisites';
import { professors } from '../assets/data/professors';
import { semesters } from '../assets/data/semesters';
import { subjects } from '../assets/data/subjects';

export async function seedSubjects(db) {
    const result = await db.getFirstAsync("SELECT COUNT(*) as count FROM Subjects");
    if (result.count === 0) {
        for (const subject of subjects) {
            await db.runAsync(
                `INSERT INTO Subjects (id, code, name_en, name_ar, credit_hours, project_weight, exam_weight) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [subject.id, subject.code, subject.name_en, subject.name_ar, subject.credit_hours, subject.project_weight, subject.exam_weight]
            );
        }
        console.log("Subjects seeded!");
    }
}

export async function seedPrerequisites(db) {
    const result = await db.getFirstAsync("SELECT COUNT(*) as count FROM Prerequisites");
    if (result.count === 0) {
        for (const pre of prerequisites) {
            await db.runAsync(
                `INSERT INTO Prerequisites (subject_id, required_subject_id) VALUES (?, ?)`,
                [pre.subject_id, pre.required_subject_id]
            );
        }
        console.log("Prerequisites seeded!");
    }
}

export async function seedSemesters(db) {
    const result = await db.getFirstAsync("SELECT COUNT(*) as count FROM Semesters");
    if (result.count === 0) {   
        for (const sem of semesters) {
            await db.runAsync(
                `INSERT INTO Semesters (id, name) VALUES (?, ?)`,
                [sem.id, sem.name]
            );
        }
        console.log("Semesters seeded!");
    }
}

export async function seedProfessors(db) {
    const result = await db.getFirstAsync("SELECT COUNT(*) as count FROM Professors");
    if (result.count === 0) {
        for (const prof of professors) {
            await db.runAsync(
                `INSERT INTO Professors (id, name) VALUES (?, ?)`,
                [prof.id, prof.name]
            );
        }
        console.log("Professors seeded!");
    }
}

export async function seedAvailableClasses(db) {
    const result = await db.getFirstAsync("SELECT COUNT(*) as count FROM Available_Classes");
    if (result.count === 0) {
        for (const cls of availableClasses) {
            await db.runAsync(
                `INSERT INTO Available_Classes (id, semester_id, subject_id, professor_id, class_name, lecture_time) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [cls.id, cls.semester_id, cls.subject_id, cls.professor_id, cls.class_name, cls.lecture_time]
            );
        }
        console.log("Available Classes seeded!");
    }
}

export async function seedDatabase(db) {
    try {
        await seedSubjects(db);
        await seedProfessors(db);
        await seedSemesters(db);
        
        await seedPrerequisites(db);
        await seedAvailableClasses(db);
        
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}