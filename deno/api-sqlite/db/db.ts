import { Database } from "jsr:@db/sqlite@0.11"

export const db = new Database("./test.db")

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );
`)
