import { createSubjectsTable } from "./schema";

export async function initializeDatabase(db) {
   await createSubjectsTable(db);
}