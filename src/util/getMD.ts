import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import axios from "axios";

const postsDirectory = `${process.env.PUBLIC_URL}/data`;

export async function getMDData(id: string) {
  const fullPath = `${postsDirectory}/${id}.md`;
  const fileContents = await axios.get<string>(fullPath);
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents.data);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    date: matterResult.data.date,
    title: matterResult.data.title,
  };
}

type Response = {
  [key: string]: { value: string };
};

export interface ResultType {
  id: string;
  contentHtml: string;
  date: any;
  title: string;
  [key: string]: any;
}

export async function getSortedMDData(type: string, newest: boolean = true) {
  const fullPath = `${postsDirectory}/${type}/index.json`;
  // Get file names under /data/type
  const fileNames = await axios.get<{ [key: string]: string }>(fullPath);

  const getData = async (fileName: string) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");
    const mdPath = `${postsDirectory}/${type}/${fileName}`;
    const fileContents = await axios.get<string>(mdPath);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents.data);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    const result: ResultType = {
      id,
      date: matterResult.data.date,
      title: matterResult.data.title,
      contentHtml,
      ...matterResult.data,
    };
    return result;
  };

  // Run all getData calls concurrently
  const results = await Promise.all(
    Object.entries(fileNames.data).map(([_, fileName]) => getData(fileName))
  );

  // Sort posts by date
  return results.sort((a, b) => {
    if (newest) return a.date < b.date ? 1 : -1;
    else return a.date > b.date ? 1 : -1;
  });
}