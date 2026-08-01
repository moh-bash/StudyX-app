// get available Subjects
export async function getAvailableSubjects(db) {
    return await db.getAllAsync(
        `
            SELECT s.* 
            FROM Subjects s
            WHERE s.id NOT IN (
                SELECT subject_id FROM Student_Enrollments WHERE status = 'Passed'
            )
            AND NOT EXISTS (
                SELECT 1 FROM Prerequisites p 
                WHERE p.subject_id = s.id 
                AND p.required_subject_id NOT IN (
                    SELECT subject_id FROM Student_Enrollments WHERE status = 'Passed'
                )
            );
        `
    )
};

// add a new Subject to student
export async function enrollStudentInSubjects(db, semesterId, subjectIds) {
    for (const subjectId of subjectIds) {
        await db.runAsync(
            `INSERT INTO Student_Enrollments (semester_id, subject_id) VALUES (?, ?)`,
            [semesterId, subjectId]
        );
    }
};

// get subjects for a specific semester
export async function getSubjectsForSemester(db, semesterId) {
    return await db.getAllAsync(
        `SELECT 
        Subjects.id,
        Subjects.code,
        Subjects.name_ar,
        Subjects.name_en,
        Subjects.credit_hours,
        Subjects.project_weight,
        Subjects.exam_weight,
        Student_Enrollments.status,
        Student_Enrollments.project_mark,
        Student_Enrollments.exam_mark,
        Student_Enrollments.total_mark
        FROM Student_Enrollments
        JOIN Subjects ON Student_Enrollments.subject_id = Subjects.id
        WHERE Student_Enrollments.semester_id = ?;`,
         [semesterId]
    )
}