import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

const postsDir = path.join(process.cwd(), "posts");

function normalizeDescription(description: unknown, content: string): string {
  if (typeof description === "string" && description.trim().length > 0) {
    return description.trim();
  }

  const firstNonEmptyLine = content
    .split(/\r?\n/)
    .find((line) => line.trim().length > 0);

  return firstNonEmptyLine ? firstNonEmptyLine.trim() : "";
}

function normalizeDate(date: unknown): string {
  if (typeof date === "string" && date.trim().length > 0) {
    return date.trim();
  }

  return "1970-01-01";
}

export function getLatestPosts(limit = 3): PostMeta[] {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

  const posts = files
    .map((fileName) => {
      const filePath = path.join(postsDir, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      const title = parsed.data?.title ?? "無題";
      const description = normalizeDescription(
        parsed.data?.description,
        parsed.content,
      );
      const date = normalizeDate(parsed.data?.date);

      return {
        slug: fileName.replace(/\.md$/i, ""),
        title: String(title),
        description: String(description),
        date: String(date),
      };
    })
    .filter((post) => post.title.length > 0)
    .sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return bTime - aTime;
    });

  return posts.slice(0, limit);
}
