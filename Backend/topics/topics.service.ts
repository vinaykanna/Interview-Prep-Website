import db from "../db.ts";
import getHeaders from "../utils/getHeaders.ts";
import sluggify from "../utils/sluggify.ts";

async function createTopic(req: Request) {
  try {
    const body = await req.json();
    const { name, description, parent } = body;
    const slug = sluggify(name);

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

function buildHierarchy(items: any[]) {
  const itemMap = new Map();

  items.forEach((item: any) =>
    itemMap.set(item.slug, { ...item, children: [] })
  );

  const result: any[] = [];

  items.forEach((item) => {
    if (item.parent === null) {
      result.push(itemMap.get(item.slug));
    } else {
      const parent = itemMap.get(item.parent);
      if (parent) {
        parent.children.push(itemMap.get(item.slug));
      }
    }
  });

  return result;
}

function getAllTopics() {
  const query = "SELECT * FROM topics";

  const topicsData = db.query(query);

  const topics = [];

  for (const topic of topicsData) {
    const [id, name, slug, description, parent, createdAt, updatedAt] = topic;

    topics.push({
      id,
      name,
      slug,
      description,
      parent,
      createdAt,
      updatedAt,
    });
  }

  return topics;
}

function getTopics(url?: URL) {
  const parent = url?.searchParams.get("parent");
  const type = url?.searchParams.get("type");

  try {
    let topics = getAllTopics();

    if (type === "hierarchy") {
      const hierarchicalItems = buildHierarchy(topics);
      let result = hierarchicalItems;

      if (parent && parent !== "none") {
        const items = hierarchicalItems.find((topic) => topic.slug === parent);
        result = items?.children || [];
      }

      return new Response(JSON.stringify(result), {
        headers: getHeaders(),
        status: 200,
      });
    } else {
      if (parent && parent !== "none") {
        topics = topics.filter((topic) => topic.parent === parent);
      }

      if (parent === "none") {
        topics = topics.filter((topic) => !topic.parent);
      }

      return new Response(JSON.stringify(topics), {
        headers: getHeaders(),
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error }),
      {
        headers: getHeaders(),
        status: 500,
      }
    );
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
    const { name, description, parent } = body;
    const slug = sluggify(name);

    db.query(
      `UPDATE topics SET
       name = ?,
       slug = ?,
       description = ?,
       parent = ?,
       updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [name, slug, description, parent, id]
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

export { createTopic, getTopics, deleteTopic, updateTopic };
