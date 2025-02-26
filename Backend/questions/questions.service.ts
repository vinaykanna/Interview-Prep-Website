import db from "../db.ts";
import getHeaders from "../utils/getHeaders.ts";

async function createQuestion(req: Request) {
  try {
    const body = await req.json();
    const { name, answer, difficulty, topicId } = body;
    const slug = name.toLowerCase().replace(/ /g, "-");

    db.query(
      "INSERT INTO questions (name, slug, answer, difficulty, topic_id) VALUES (?, ?, ?, ?, ?)",
      [name, slug, answer, difficulty, topicId]
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

function getQuestions() {
  try {
    const topics = db.query("SELECT * FROM questions");

    const result = [];

    for (const [id, name, slug, answer, difficulty, topicId] of topics) {
      result.push({
        id,
        name,
        slug,
        difficulty,
        answer,
        topicId,
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
    const { name, answer, topicId } = body;

    db.query(
      "UPDATE questions SET name = ?, answer = ?, parent_id = ? WHERE id = ?",
      [name, answer, topicId, id]
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
