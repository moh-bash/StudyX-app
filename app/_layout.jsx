import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from "../database";
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