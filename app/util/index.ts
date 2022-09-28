import clsx from "clsx";
type ArticleMeta = {
  title: string;
  description: string;
  created: string;
  edited: string | undefined;
  tags: string[];
}

export type ArticlePreview = {
  slug: string;
  meta: ArticleMeta
}

export enum ViewType {
  LIST= "LIST",
  GRID = "GRID",
};

export function iconClasses(view:ViewType, viewType: ViewType) {
  return clsx({
    "w-6 mr-2 fill-primary": view === viewType,
    "w-6 mr-2 fill-light-gray": view !== viewType,
  });
};

export function articleClasses(view:ViewType, ) {
  if (view === ViewType.LIST) return "grid gap-6 pb-10";
  return "grid grid-cols-2 gap-2 pb-10 article-card";
}

export function textClasses(view:ViewType, viewType: ViewType) {
  return clsx({
    "text-primary": view === viewType,
    "text-light-gray": view !== viewType,
  });
};

export function isTagSelected(tag: string, searchParams: URLSearchParams) {
  return clsx({
    "bg-white py-2 px-4 text-bg rounded-[20px] cursor-pointer border-2 border-primary": searchParams.get("tags")?.includes(tag),
    "bg-bg-darker py-2 px-4 text-light-gray rounded-[20px] border-2 border-bg-darker cursor-pointer": !searchParams.get("tags")?.includes(tag),
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

export function filterArticles(array: ArticlePreview[], searchParams: URLSearchParams) {
  const tags = searchParams.get("tags");
  if (!tags) return {
    filteredArticles: array,
    numberOfMatches: 0
  };

  const tagsArray = tags.split("+");
  const filteredArticles = array.filter((article) => {
    const articleTags = article.meta.tags;
    return tagsArray.every((tag) => articleTags.includes(tag));
  });

  return {
    filteredArticles,
    numberOfMatches: filteredArticles.length
  };
};

export function formatTheDate(dateString: string | undefined) {
  if (dateString) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {dateStyle: "full"};
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return "";
};