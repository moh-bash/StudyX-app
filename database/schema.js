export async function createSubjectsTable(db) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS grades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_grade REAL,
        exam_grade REAL,
        name_subject TEXT,
        total_grade REAL GENERATED ALWAYS AS ((project_grade * 0.75) + (exam_grade * 0.25)) STORED,
        created_at TEXT DEFAULT (datetime('now'))
        );
    `);
}