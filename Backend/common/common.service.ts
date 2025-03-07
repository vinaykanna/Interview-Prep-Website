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

async function uploadAsset(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return new Response(JSON.stringify({ message: "No file uploaded" }), {
        status: 400,
      });
    }

    const fileName = (file as File).name.replaceAll(" ", "_");
    const filePath = `./static/${fileName}`;
    const fileContent = await (file as File).arrayBuffer();
    await Deno.writeFile(filePath, new Uint8Array(fileContent));

    return new Response(
      JSON.stringify({
        message: "Uploaded",
        urlPath: `/common/static/${fileName}`,
      }),
      {
        headers: getHeaders(),
        status: 201,
      }
    );
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      headers: getHeaders(),
      status: 500,
    });
  }
}

async function getAsset(file: string) {
  try {
    const filePath = `./static/${file}`;
    const fileContent = await Deno.readFile(filePath);

    return new Response(fileContent, {
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

export { searchTopicsAndQuestions, uploadAsset, getAsset };
