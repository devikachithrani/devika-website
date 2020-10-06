import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import axios from "axios";

const postsDirectory = path.join(process.env.PUBLIC_URL, "data");

export async function getMDData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = await axios.get<string>(fullPath);
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents.data);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
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

export async function getSortedMDData(type: string) {
  const fullPath = path.join(postsDirectory, `${type}/index.json`);
  // Get file names under /data/type
  const fileNames = await axios.get<{ [key: string]: string }>(fullPath);
  const getData = async (fileName: string) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, `${type}/${fileName}`);
    const fileContents = await axios.get<string>(fullPath);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents.data);

    // Combine the data with the id
    return {
      id,
      date: matterResult.data.date,
      title: matterResult.data.title,
    };
  };

  // In order to use asyc/await, need to wrap the functions in Promise.all, as the map will return promises.
  const runGetData = async () => {
    const results = await Promise.all(
      Object.entries(fileNames.data).map(([key, fileName]: [string, string]) =>
        getData(fileName)
      )
    );
    return results;
  };

  const allPostsData = await runGetData();

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
