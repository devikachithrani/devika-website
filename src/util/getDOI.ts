import axios from "axios";

// ---------- Types ----------
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
    publisher: string;
  };
};

type DOIType = {
  doi: string;
  isbn?: string;
  book?: boolean;
  custom?: CitationType;
};

// ---------- Helpers ----------
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const DOI_CACHE_KEY = "doi_cache_v1";

function getCache(): Record<string, CitationType> {
  try {
    return JSON.parse(localStorage.getItem(DOI_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCache(cache: Record<string, CitationType>) {
  localStorage.setItem(DOI_CACHE_KEY, JSON.stringify(cache));
}

function getCachedCitation(doi: string): CitationType | null {
  const cache = getCache();
  return cache[doi] || null;
}

function saveCitationToCache(doi: string, data: CitationType) {
  const cache = getCache();
  cache[doi] = data;
  saveCache(cache);
}

// ---------- Axios Instance (no User-Agent to avoid CORS block) ----------
const api = axios.create({
  baseURL: "https://api.crossref.org/works/",
  headers: {
    Accept: "application/json",
  },
  timeout: 15000,
});

// ---------- Safe iterative fetch with capped retries ----------
export const getCitationFromDoi = async (
  doi: string,
  custom?: CitationType
): Promise<CitationType> => {
  const cached = getCachedCitation(doi);
  if (cached) {
    console.log("⚡ Using cached DOI:", doi);
    return cached;
  }

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`🔍 Fetching DOI [${attempt}]:`, doi);
    try {
      const res = await api.get(`${encodeURIComponent(doi)}`);
      const data = res.data.message;

      const result: CitationType = {
        DOI: data.DOI,
        URL: data.URL,
        journal: data["container-title"]?.[0] || "",
        date: new Date(data.created?.["date-time"] || Date.now()),
        title: data.title?.[0] || "(No title)",
        authors: data.author || [],
        citations: data["is-referenced-by-count"] || 0,
        book: data.page
          ? { page: data.page, publisher: data.publisher || "" }
          : undefined,
      };

      saveCitationToCache(doi, result);
      return result;
    } catch (err: any) {
      const status = err.response?.status;
      console.warn(`⚠️  Error on DOI [${attempt}/${maxRetries}]:`, doi, status);
      if (status === 429) await delay(3000); // wait longer if rate limited
      else await delay(1000); // short delay for other errors
    }
  }

  console.error(`❌ DOI failed after ${maxRetries} attempts:`, doi);
  return (
    custom || {
      DOI: doi,
      URL: "",
      journal: "",
      date: new Date(),
      title: "(DOI not available)",
      authors: [],
      citations: 0,
    }
  );
};

// ---------- Batch Fetch Helper ----------
async function fetchInBatches<T>(
  items: T[],
  fn: (item: T) => Promise<any>,
  batchSize = 5
) {
  const results: any[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
    await delay(1000); // longer delay between batches
  }
  return results;
}

// ---------- Fetch All DOIs ----------
export const getDois = async (location: string, newest: boolean = true) => {
  const fullPath = `${process.env.PUBLIC_URL || ""}/data/${location}/index.json`;
  console.log("📚 Loading DOI index from:", fullPath);

  let dois: { [key: string]: DOIType } = {};
  try {
    const res = await axios.get(fullPath);
    dois = res.data;
  } catch (err: any) {
    console.error("❌ Failed to load DOI index:", fullPath, err.message);
    return [];
  }

  const entries = Object.entries(dois);
  console.log(`🧾 Fetching ${entries.length} DOIs in batches...`);

  const results: CitationType[] = await fetchInBatches(
    entries,
    async ([, value]: [string, DOIType]) =>
      await getCitationFromDoi(value.doi, value.custom),
    5 // concurrent requests per batch
  );

  console.log("✅ All DOIs processed:", results.length);
  return sortByDate(results, newest);
};

// ---------- Sorting ----------
export const sortByDate = (val: CitationType[], newest: boolean = true) => {
  return val.sort((a, b) => {
    const dateA =
      a.date instanceof Date ? a.date : new Date(a.date as any);
    const dateB =
      b.date instanceof Date ? b.date : new Date(b.date as any);

    return newest
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });
};

export const sortByCitation = (val: CitationType[], largest: boolean = true) =>
  val.sort((a, b) =>
    largest ? b.citations - a.citations : a.citations - b.citations
  );