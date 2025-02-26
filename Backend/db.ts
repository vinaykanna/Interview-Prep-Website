import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

const db = new DB("sqlite.db");

// db.execute(`
//   DROP TABLE topics;
// `);

// db.execute(`
//   DROP TABLE questions;
// `);

// Tables
db.execute(`
  CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      description TEXT DEFAULT NULL,
      parent TEXT REFERENCES topics(slug) ON DELETE CASCADE DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

db.execute(`
  CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      answer TEXT NOT NULL,
      difficulty TEXT CHECK( difficulty IN ('easy', 'medium', 'hard') ) NOT NULL,
      topic_id INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// Indexes
db.execute(`
  CREATE INDEX IF NOT EXISTS idx_topics_slug ON topics(slug);
`);

db.execute(`
  CREATE INDEX IF NOT EXISTS idx_questions_slug ON questions(slug);
`);

db.execute(`
  CREATE INDEX IF NOT EXISTS idx_questions_topic_id ON questions(topic_id);
`);

export default db;
