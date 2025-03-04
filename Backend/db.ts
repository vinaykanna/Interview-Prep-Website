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
      topic TEXT NOT NULL REFERENCES topics(slug) ON DELETE CASCADE ON UPDATE CASCADE,
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
  CREATE INDEX IF NOT EXISTS idx_questions_topic_slug ON questions(topic);
`);

// Safely update table
// db.execute(`
//   -- Start a transaction
// BEGIN TRANSACTION;

// -- Create the new table with ON UPDATE CASCADE
// CREATE TABLE questions_new (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL UNIQUE,
//     slug TEXT NOT NULL UNIQUE,
//     answer TEXT NOT NULL,
//     difficulty TEXT CHECK( difficulty IN ('easy', 'medium', 'hard') ) NOT NULL,
//     topic TEXT NOT NULL REFERENCES topics(slug) ON DELETE CASCADE ON UPDATE CASCADE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Copy all data from the old table to the new one
// INSERT INTO questions_new (id, name, slug, answer, difficulty, topic, created_at, updated_at)
// SELECT id, name, slug, answer, difficulty, topic, created_at, updated_at
// FROM questions;

// -- Drop the old table
// DROP TABLE questions;

// -- Rename the new table to the original name
// ALTER TABLE questions_new RENAME TO questions;

// -- Commit the transaction
// COMMIT;
//   `);

export default db;
