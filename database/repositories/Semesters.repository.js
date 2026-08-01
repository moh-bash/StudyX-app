// get all Semesters
export async function getSemesters(db) {
    return await db.getAllAsync(
        "SELECT * FROM Semesters ORDER BY id DESC"
    );
};

// get semester Student_Enrollments
export async function getEnrolledSemesters(db,) {
    return await db.getAllAsync(
       `SELECT DISTINCT 
        Semesters.id,
        Semesters.name
        FROM Semesters
        JOIN Student_Enrollments ON Semesters.id = Student_Enrollments.semester_id;`
    );
}

// add a new Semester
export async function addNewSemester(db, semesterName) {
    return await db.runAsync(
        "INSERT INTO Semesters (name) VALUES (?)",
        [semesterName]
    );
};