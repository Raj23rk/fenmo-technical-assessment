import Database from "better-sqlite3";

const db = new Database("expenses.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    amount INTEGER,
    category TEXT,
    description TEXT,
    date TEXT,
    created_at TEXT
  )
`).run();

export default db;  
