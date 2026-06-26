import { openDatabase } from "expo-sqlite";

const db = openDatabase("myapp.db");
const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)"
    );
  });
};

createTable();

export default db;