import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, "sqlite.db"));

// Enable WAL mode for better concurrency
db.pragma("journal_mode = WAL");

// Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT DEFAULT NULL,
      parent TEXT REFERENCES topics(slug) ON DELETE CASCADE DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      answer TEXT NOT NULL,
      difficulty TEXT CHECK( difficulty IN ('easy', 'medium', 'hard') ) NOT NULL,
      topic TEXT NOT NULL REFERENCES topics(slug) ON DELETE CASCADE ON UPDATE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// Indexes
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_topics_slug ON topics(slug);
`);

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_questions_slug ON questions(slug);
`);

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_questions_topic_slug ON questions(topic);
`);

export default db;
