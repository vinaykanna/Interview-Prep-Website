import db from "../db.ts";
import getHeaders from "../utils/getHeaders.ts";

async function createTopic(req: Request) {
  try {
    const body = await req.json();
    const { name, description, parent } = body;
    const slug = name.toLowerCase().replace(/ /g, "-");

    db.query(
      "INSERT INTO topics (name, slug, description, parent) VALUES (?, ?, ?, ?)",
      [name, slug, description, parent]
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

function getTopics(url: URL) {
  const parent = url.searchParams.get("parent");

  try {
    let query = "SELECT * FROM topics";

    if (parent && parent !== "none") {
      query += ` WHERE parent = '${parent}'`;
    }

    if (parent === "none") {
      query += " WHERE parent IS NULL";
    }

    const topics = db.query(query);

    const result = [];

    for (const topic of topics) {
      const [id, name, slug, description, parent, createdAt, updatedAt] = topic;

      result.push({
        id,
        name,
        slug,
        description,
        parent,
        createdAt,
        updatedAt,
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

function getTopicBySlug(slug: string) {
  try {
    const topics = db.query(`SELECT * FROM topics WHERE slug = ?`, [slug]);

    let result = {};

    for (const topic of topics) {
      const [id, name, slug, description, parentId, createdAt, updatedAt] =
        topic;

      result = {
        id,
        name,
        slug,
        description,
        parentId,
        createdAt,
        updatedAt,
      };
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

function deleteTopic(url: URL) {
  const splits = url.pathname.split("/");
  const id = splits.at(-1);

  try {
    db.query("DELETE FROM topics WHERE id = ?", [id]);
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

async function updateTopic(req: Request, url: URL) {
  const splits = url.pathname.split("/");
  const id = splits.at(-1);

  try {
    const body = await req.json();
    const { name, parentId, description } = body;
    const slug = name.toLowerCase().replace(/ /g, "-");

    db.query(
      `UPDATE topics SET
       name = ?,
       slug = ?,
       description = ?,
       parent_id = ?,
       updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [name, slug, description, parentId, id]
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

export { createTopic, getTopics, deleteTopic, updateTopic, getTopicBySlug };
