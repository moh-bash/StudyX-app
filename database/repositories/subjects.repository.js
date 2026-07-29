// get all subjects
export async function getSubjects(db) {
    return await db.getAllAsync(
        "SELECT * FROM grades ORDER BY id DESC"
    );
};

// get a subject by id
export async function getSubjectById(db, id) {
    return await db.getFirstAsync(
        "SELECT * FROM grades WHERE id = ?",
        [id]
    );
};

// add a new subject
export async function addSubject(db, projectGrade, examGrade, nameSubject) {
    await db.runAsync(
        `INSERT INTO grades
            (project_grade, exam_grade, name_subject)
            VALUES (?, ?, ?)`,
        [
            projectGrade,
            examGrade,
            nameSubject,
        ]
    );
};

// delete a subject
export async function deleteSubject(db, id) {
    await db.runAsync(
        "DELETE FROM grades WHERE id = ?",
        [id]
    );
};

// average grade
export async function avgGrade(db) {
    return await db.getAllAsync(
        "SELECT AVG(total_grade) as avg FROM grades"
    );
}

// get number of subjects
export async function getNumSubjects(db) {
    return await db.getAllAsync('SELECT COUNT(*) AS num_subjects FROM grades;');
}