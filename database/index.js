import { initDatabaseSchema } from "./schema";
import { seedDatabase } from "./seed";
export async function initializeDatabase(db) {
   await initDatabaseSchema(db);
   await seedDatabase(db);
}