import { useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import type { MetaFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { articleClasses, formatTheDate, ViewType } from "~/util";
import { filterArticles, removeDuplicates } from "~/util";
import { getArticlesMeta } from "~/util/articles.server";
import type { ArticlePreview } from "~/util";

import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import PageHeader from "~/components/PageHeader";
import arrowRightIcon from "~/assets/icons/arrowRight";

type LoaderData = {
  articlesPreview: ArticlePreview[];
};

export const loader: LoaderFunction = async () => {
  const slugs = getArticlesMeta();

  return json({
    articlesPreview: slugs.reverse(),
  });
};

export const meta: MetaFunction = () => ({
  title: "Blog | Milton David",
  description: "Milton David's blog",
});

export default function BlogIndex() {
  const loaderData = useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams();

  const headerContent = {
    heading: "My Blog",
    paragraph: "His attempt to synthesize his ideas, chatter, and do good."
  };

  // TODO: map and dedupe in one fell swoop
  const tags = useMemo(
    () => loaderData.articlesPreview.map(ap => ap.meta.tags).flat(),
    [loaderData]
  );

  const uniqueTags = useMemo(
    () => removeDuplicates(tags),
  [tags])

  const searchParamsLength = searchParams.get("tags") ? searchParams.get("tags")!.length : 0;
  const searchParamsTags = searchParams.get("tags") ? searchParams.get("tags")!.split("+") : [];

  // TODO: simplify this function
  function handleFilter(event: MouseEvent<HTMLButtonElement>) {
    const tag = event.currentTarget.value;
    const currentTags = searchParams.get("tags");

    if (currentTags) {
      const arrayOfTags = currentTags.split("+");

      if (arrayOfTags.includes(tag)) {
        const newSearchParams = arrayOfTags.filter( param => param !== tag);

        if (newSearchParams.length === 0) {
          searchParams.has("tags") && searchParams.delete("tags");
          setSearchParams(searchParams);
        } else {
          const newSearchParamsString = newSearchParams.join("+");
          setSearchParams({ tags: newSearchParamsString});
        }
      } else setSearchParams({ tags: `${currentTags}+${tag}` });
    } else setSearchParams({ tags: tag });
  };

  return (
    <>
      <Navbar />
    </>
  )
};
