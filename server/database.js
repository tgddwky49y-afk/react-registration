import { DatabaseSync } from 'node:sqlite';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
});

// Локально используем файл, на Vercel — базу в памяти для чтения демоданных.
const sqlite = new DatabaseSync(process.env.VERCEL ? ':memory:' : 'tasks.sqlite');
sqlite.exec('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL)');
const db = drizzle(async (sql, params, method) => {
  const stmt = sqlite.prepare(sql);
  if (method === 'run') {
    stmt.run(...params);
    return { rows: [] };
  }
  stmt.setReturnArrays(true);
  return { rows: stmt.all(...params) };
});

await db.insert(tasks).values([
  { id: 1, title: 'Создать форму регистрации' },
  { id: 2, title: 'Проверить API' },
]).onConflictDoNothing();

export function listTasks() {
  return db.select().from(tasks).orderBy(tasks.id).all();
}
