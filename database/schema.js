// database/schema.js
export async function enableForeignKeys(db) {
    await db.execAsync(`PRAGMA foreign_keys = ON;`);
}

// table sbjects
export async function createSubjectsTable(db) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL UNIQUE,
            name_en TEXT NOT NULL,
            name_ar TEXT NOT NULL,
            credit_hours INTEGER NOT NULL,
            project_weight INTEGER NOT NULL,
            exam_weight INTEGER NOT NULL
        );
    `);
}


// table prerequisites
export async function createPrerequisitesTable(db) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Prerequisites (
            subject_id INTEGER NOT NULL,
            required_subject_id INTEGER NOT NULL,
            PRIMARY KEY (subject_id, required_subject_id),
            FOREIGN KEY (subject_id) REFERENCES Subjects(id) ON DELETE CASCADE,
            FOREIGN KEY (required_subject_id) REFERENCES Subjects(id) ON DELETE CASCADE
        );
    `);
}

// table semesters
export async function createSemestersTable(db) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Semesters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        );
    `);
}


// table professors
export async function createProfessorsTable(db) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Professors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);
}


// table available_classes
export async function createAvailableClassesTable(db) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Available_Classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            semester_id INTEGER NOT NULL,
            subject_id INTEGER NOT NULL,
            professor_id INTEGER NOT NULL,
            class_name TEXT NOT NULL,
            lecture_time TEXT,
            FOREIGN KEY (semester_id) REFERENCES Semesters(id) ON DELETE CASCADE,
            FOREIGN KEY (subject_id) REFERENCES Subjects(id) ON DELETE CASCADE,
            FOREIGN KEY (professor_id) REFERENCES Professors(id) ON DELETE CASCADE
        );
    `);
}


// table student_enrollments
export async function createStudentEnrollmentsTable(db) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Student_Enrollments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            semester_id INTEGER NOT NULL,
            subject_id INTEGER NOT NULL,
            class_id INTEGER, 
            project_mark REAL,
            exam_mark REAL,
            total_mark REAL,
            status TEXT DEFAULT 'Pending', -- 'Pending', 'Passed', 'Failed'
            FOREIGN KEY (semester_id) REFERENCES Semesters(id) ON DELETE CASCADE,
            FOREIGN KEY (subject_id) REFERENCES Subjects(id) ON DELETE CASCADE,
            FOREIGN KEY (class_id) REFERENCES Available_Classes(id) ON DELETE SET NULL
        );
    `);
}

export async function initDatabaseSchema(db) {
    try {
        await enableForeignKeys(db);

        await createSubjectsTable(db);
        await createSemestersTable(db);
        await createProfessorsTable(db);

        await createPrerequisitesTable(db);
        await createAvailableClassesTable(db);
        
        await createStudentEnrollmentsTable(db);

        console.log("Database schema initialized successfully!");
    } catch (error) {
        console.error("Error initializing database schema:", error);
    }
}