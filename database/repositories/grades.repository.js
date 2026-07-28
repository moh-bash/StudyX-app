export async function getGrades(db) {
    return await db.getAllAsync(
        "SELECT * FROM grades ORDER BY id DESC"
    );
};

export async function avgGrade(db) {
    return await db.getAllAsync(
        "SELECT AVG(total_grade) as avg FROM grades"
    );
}