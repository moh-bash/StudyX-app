import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import "../global.css";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="app.db"
      onInit={initializeDatabase}
    >
      <Stack screenOptions={{
        headerShown: false,
        animated: true,
        animation: "slide_from_bottom"
      }} />
    </SQLiteProvider>
  );
}

async function initializeDatabase(db) {
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
