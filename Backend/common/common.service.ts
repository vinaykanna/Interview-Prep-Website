// deno-lint-ignore-file no-explicit-any
import db from "../db.ts";
import getHeaders from "../utils/getHeaders.ts";
import { SearchResultType } from "./common.types.ts";

function searchTopicsAndQuestions(url: URL) {
  try {
    const query = url.searchParams.get("query");

    const result: SearchResultType = {
      topics: [],
      questions: [],
    };

    const topics: any[] = db.query("SELECT * FROM topics WHERE name LIKE ?", [
      `%${query}%`,
    ]);

    const questions: any[] = db.query(
      "SELECT * FROM questions WHERE name LIKE ?",
      [`%${query}%`]
    );

    for (const [id, name, slug] of topics) {
      result.topics.push({
        id,
        name,
        slug,
      });
    }

    for (const [id, name, slug, _, __, topic] of questions) {
      result.questions.push({
        id,
        name,
        slug,
        topic,
      });
    }

    return new Response(JSON.stringify(result), {
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

export { searchTopicsAndQuestions };
