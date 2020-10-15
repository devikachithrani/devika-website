import path from "path";
import axios from "axios";

const postsDirectory = path.join(process.env.PUBLIC_URL, "data/");

export type CitationType = {
  DOI: string;
  URL: string;
  journal: string;
  date: Date;
  title: string;
  authors: { given: string; family: string; sequence: string }[];
  citations: number;
  book?: {
    page: string;
    publsher: string;
  };
};

export const getCitationFromDoi = async (
  doi: string
): Promise<CitationType> => {
  const results = await axios.get<any>(`https://api.crossref.org/works/${doi}`);
  const data = results.data.message;
  return {
    DOI: data.DOI,
    URL: data.URL,
    journal: data["container-title"][0],
    date: new Date(data.created["date-time"]),
    title: data.title[0],
    authors: data.author,
    citations: data["is-referenced-by-count"],
  };
};

export const getBookFromDoi = async (doi: string): Promise<CitationType> => {
  const results = await axios.get<any>(`https://api.crossref.org/works/${doi}`);
  const data = results.data.message;
  return {
    DOI: data.DOI,
    URL: data.URL,
    journal: data["container-title"][0],
    date: new Date(data.created["date-time"]),
    title: data.title[0],
    authors: data.author,
    citations: data["is-referenced-by-count"],
    book: { page: data.page, publsher: data.publisher },
  };
};

type DOIType = {
  doi: string;
  isbn?: string;
  book?: boolean;
};

export const getDois = async (location: string, newest: boolean = true) => {
  const fullPath = path.join(postsDirectory, `${location}/index.json`);

  // Get all the data from the path
  const dois = await axios.get<{ [key: string]: DOIType }>(fullPath);

  // Get all the citations from the .json file
  const result: CitationType[] = await Promise.all(
    Object.entries(dois.data).map(([key, value]: [string, DOIType]) => {
      if (value.book) return getBookFromDoi(value.doi);
      else return getCitationFromDoi(value.doi);
    })
  );

  // and sort them by date
  return sortByDate(result, newest);
};

export const sortByDate = (val: CitationType[], newest: boolean = true) => {
  return val.sort((a, b) => {
    if (newest) {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (a.date > b.date) {
        return 1;
      } else {
        return -1;
      }
    }
  });
};

export const sortByCitation = (
  val: CitationType[],
  largest: boolean = true
) => {
  return val.sort((a, b) => {
    if (largest) {
      if (a.citations < b.citations) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (a.citations > b.citations) {
        return 1;
      } else {
        return -1;
      }
    }
  });
};
