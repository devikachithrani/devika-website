import matter from "gray-matter";
import remark from "remark"; // ✅ modern import (prevents future deprecation)
import html from "remark-html";
import axios from "axios";

// ✅ Ensure correct base path in both dev ("/data") and production ("/~devikac/data")
const postsDirectory = `${process.env.PUBLIC_URL || ""}/data`;

/**
 * Load a single markdown file and convert it to HTML.
 */
export async function getMDData(id: string) {
  try {
    const fullPath = `${postsDirectory}/${id}.md`;
    const fileContents = await axios.get<string>(fullPath);
    const matterResult = matter(fileContents.data);

    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      date: matterResult.data.date,
      title: matterResult.data.title,
    };
  } catch (error) {
    console.error(`❌ Failed to load markdown file: ${id}.md`, error);
    return {
      id,
      contentHtml: "<p>Content unavailable.</p>",
      date: "",
      title: "Error loading content",
    };
  }
}

export interface ResultType {
  id: string;
  contentHtml: string;
  date: any;
  title: string;
  [key: string]: any;
}

/**
 * Load and sort markdown data for a given section (e.g., news, members, etc.)
 */
export async function getSortedMDData(type: string, newest: boolean = true) {
  try {
    const fullPath = `${postsDirectory}/${type}/index.json`;
    const fileNames = await axios.get<{ [key: string]: string }>(fullPath);

    const getData = async (fileName: string): Promise<ResultType> => {
      const id = fileName.replace(/\.md$/, "");
      const mdPath = `${postsDirectory}/${type}/${fileName}`;
      const fileContents = await axios.get<string>(mdPath);

      const matterResult = matter(fileContents.data);
      const processedContent = await remark().use(html).process(matterResult.content);
      const contentHtml = processedContent.toString();

      return {
        id,
        date: matterResult.data.date,
        title: matterResult.data.title,
        contentHtml,
        ...matterResult.data,
      };
    };

    const results = await Promise.all(
      Object.entries(fileNames.data).map(([_, fileName]) => getData(fileName))
    );

    // ✅ Defensive sorting: handle invalid/missing dates safely
    return results.sort((a, b) => {
      const aDate = new Date(a.date || 0).getTime();
      const bDate = new Date(b.date || 0).getTime();
      return newest ? bDate - aDate : aDate - bDate;
    });
  } catch (error) {
    console.error(`❌ Failed to load markdown list for type: ${type}`, error);
    return [];
  }
}