import db from "../db.ts";
import getHeaders from "../utils/getHeaders.ts";
import sluggify from "../utils/sluggify.ts";

async function createQuestion(req: Request) {
  try {
    const body = await req.json();
    const { name, answer, difficulty = "easy", topic } = body;
    const slug = sluggify(name);

    db.query(
      "INSERT INTO questions (name, slug, answer, difficulty, topic) VALUES (?, ?, ?, ?, ?)",
      [name, slug, answer, difficulty, topic]
    );

    return new Response(JSON.stringify({ message: "Created" }), {
      headers: getHeaders(),
      status: 201,
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      headers: getHeaders(),
      status: 500,
    });
  }
}

function getQuestions(url: URL) {
  try {
    const parent = url.searchParams.get("topic");
    const topics = db.query("SELECT * FROM questions WHERE topic = ?", [
      parent,
    ]);

    const result = [];

    for (const [id, name, slug, answer, difficulty, topic] of topics) {
      result.push({
        id,
        name,
        slug,
        difficulty,
        answer,
        topic,
      });
    }

    return new Response(JSON.stringify(result), {
      headers: getHeaders(),
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      headers: getHeaders(),
      status: 500,
    });
  }
}

function deleteQuestion(url: URL) {
  const splits = url.pathname.split("/");
  const id = splits.at(-1);

  try {
    db.query("DELETE FROM questions WHERE id = ?", [id]);
    return new Response(JSON.stringify({ message: "Deleted" }), {
      headers: getHeaders(),
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      headers: getHeaders(),
      status: 500,
    });
  }
}

async function updateQuestion(req: Request, url: URL) {
  const splits = url.pathname.split("/");
  const id = splits.at(-1);

  try {
    const body = await req.json();
    const { name, answer } = body;
    const slug = sluggify(name);

    db.query(
      "UPDATE questions SET name = ?, answer = ?, slug = ? WHERE id = ?",
      [name, answer, slug, id]
    );

    return new Response(JSON.stringify({ message: "Updated" }), {
      headers: getHeaders(),
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      headers: getHeaders(),
      status: 500,
    });
  }
}

export { createQuestion, getQuestions, deleteQuestion, updateQuestion };
