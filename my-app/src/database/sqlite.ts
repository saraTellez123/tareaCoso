//Esto contiene las funciones CRUD (create, get, update, delete) 
//basicamente se comunica con AsyncStorage y SQLite
import * as SQLite from 'expo-sqlite';

// Abrimos (o creamos) la base de datos
export const db = SQLite.openDatabaseSync('app.db');

// Esta función crea la tabla si no existe todavía
export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      done INTEGER DEFAULT 0
    );
  `);
}