import clsx from "clsx";
type ArticleMeta = {
  title: string;
  description: string;
  createdTimestamp: number;
  created: string;
  edited: string | undefined;
  tags: string[];
}

export type ArticlePreview = {
  slug: string;
  meta: ArticleMeta
}

export enum ViewType {
  LIST = "LIST",
  GRID = "GRID",
};

export function iconClasses(view: ViewType, viewType: ViewType) {
  return clsx({
    "w-6 mr-2 fill-naples-yellow": view === viewType,
    "w-6 mr-2 fill-phillipine-silver": view !== viewType,
  });
};

export function articleClasses(view: ViewType,) {
  if (view === ViewType.LIST) return "grid gap-6 pt-8 responsive-block-padding padding-block-start-0";
  return "grid grid-cols-2 gap-2 responsive-block-padding padding-block-start-0 article-card";
}

export function textClasses(view: ViewType, viewType: ViewType) {
  return clsx({
    "text-naples-yellow": view === viewType,
    "text-phillipine-silver": view !== viewType,
  });
};

export function isTagSelected(tag: string, searchParams: URLSearchParams) {
  return clsx({
    "bg-baby-powder py-2 px-4 text-chinese-black rounded-[20px] cursor-pointer border-2 border-naples-yellow font-semibold": searchParams.get("tags")?.includes(tag),
    "bg-charleston-green py-2 px-4 text-phillipine-silver rounded-[20px] border-2 border-charleston-green cursor-pointer": !searchParams.get("tags")?.includes(tag),
  });
};

export function sortingFunction(a: string, b: string) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export function removeDuplicates(array: string[]) {
  const sortedArray = array.sort(sortingFunction);
  return sortedArray.filter((el, idx, ogArr) => ogArr.indexOf(el) === idx)
};

export function sortArticles(articles: ArticlePreview[], attribute: keyof ArticleMeta, order: "asc" | "desc"): ArticlePreview[] {
  const articlesCopy = [...articles];
  if (order === "asc") {
    return articlesCopy.sort((a, b) => {
      if ((a.meta[attribute] as number) < (b.meta[attribute] as number)) return -1;
      if ((a.meta[attribute] as number) > (b.meta[attribute] as number)) return 1;
      return 0;
    })
  }
  return articlesCopy.sort((a, b) => {
    if ((a.meta[attribute] as number) < (b.meta[attribute] as number)) return 1;
    if ((a.meta[attribute] as number) > (b.meta[attribute] as number)) return -1;
    return 0;
  })
}

export function filterArticles(array: ArticlePreview[], searchParams: URLSearchParams) {
  const tags = searchParams.get("tags");
  if (!tags) return {
    filteredArticles: sortArticles(array, "createdTimestamp", "desc"),
    numberOfMatches: 0
  };

  const tagsArray = tags.split("+");
  const filteredArticles = array.filter((article) => {
    const articleTags = article.meta.tags;
    return tagsArray.every((tag) => articleTags.includes(tag));
  });

  return {
    filteredArticles: sortArticles(filteredArticles, "createdTimestamp", "desc"),
    numberOfMatches: filteredArticles.length
  };
};

export function formatTheDate(dateString: string | undefined) {
  if (dateString) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { dateStyle: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return "";
};

export function customClasses(pathName: string, currentPath: string) {
  return clsx({ "active-link": pathName === currentPath },
    { "inactive-link": pathName !== currentPath }
  )
};
