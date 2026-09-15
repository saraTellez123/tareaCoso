import { db } from '../database/sqlite';
import { Task } from '../types';

//db es la conexion q abrimos en database grrr


// CREATE
export function createTask(title: string, description: string) {
  db.runSync(
    'INSERT INTO tasks (title, description, done) VALUES (?, ?, 0);',
    [title, description]
  );
}

// READ (todas)
export function getAllTasks(): Task[] {
  const result = db.getAllSync<any>('SELECT * FROM tasks;');
  return result.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    done: row.done === 1,
  }));
}

// UPDATE
export function updateTask(id: number, title: string, description: string, done: boolean) {
  db.runSync(
    'UPDATE tasks SET title = ?, description = ?, done = ? WHERE id = ?;',
    [title, description, done ? 1 : 0, id]
  );
}

// DELETE
export function deleteTask(id: number) {
  db.runSync('DELETE FROM tasks WHERE id = ?;', [id]);
}