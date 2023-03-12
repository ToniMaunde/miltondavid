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
import ViewToggler from "~/components/ViewToggler";
import Tags from "~/components/Tags";
import StringOfTags from "~/components/StringOfTags";
import PageHeader from "~/components/PageHeader";
import listIcon from "~/assets/icons/list";
import gridIcon from "~/assets/icons/grid";

type LoaderData = {
  articlesPreview: ArticlePreview[];
};

export const loader: LoaderFunction = async () => {
  const slugs = getArticlesMeta();

  return json({
    articlesPreview: slugs,
  });
};

export const meta: MetaFunction = () => ({
  title: "Blog | Milton David",
  description: "Milton David's blog",
});

export default function BlogIndex() {
  const loaderData = useLoaderData<LoaderData>();
  const { articlesPreview } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  // TODO: Read the Remix docs to get rid of the warning. Functionality is currently not impaired.
  const {filteredArticles, numberOfMatches} = filterArticles(articlesPreview, searchParams);
  const [view, setView] = useState<ViewType>(ViewType.LIST);
  const headerContent = {
    heading: "My Blog",
    paragraph: "Digressions on programming, design and life."
  };
  const tags = useMemo(
    () => loaderData.articlesPreview.map(ap => ap.meta.tags).flat(),
    [loaderData]
  );
  const uniqueTags = useMemo(
    () => removeDuplicates(tags),
  [tags])

  const searchParamsLength = searchParams.get("tags") ? searchParams.get("tags")!.length : 0;
  const searchParamsTags = searchParams.get("tags") ? searchParams.get("tags")!.split("+") : [];

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

  function changeView(event: MouseEvent<HTMLSpanElement>) {
    const viewType = event.currentTarget.dataset.view as ViewType;
    setView(viewType);
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col px-4 md:px-24 lg:px-40 xl:px-60 2xl:px-80 3xl:px-96 4xl:px-104">
        <PageHeader {...headerContent}/>

        <section>
          <small className="block text-sm text-light-gray mb-4">
            Click on a tag to read blog articles related to it. By the way, you can combine multiple tags.
          </small>
          <Tags
            handleFilter={handleFilter}
            searchParams={searchParams}
            tags={uniqueTags}
          />

          <hr className="my-4 hr-gray"/>
          
          <ViewToggler
            changeView={changeView}
            view={view}
            listIcon={listIcon}
            gridIcon={gridIcon}
          />
        </section>
        <StringOfTags
          searchParamsLength={searchParamsLength}
          searchParamsTags={searchParamsTags}
          numberOfMatches={numberOfMatches}
        />
        
        <ul className={articleClasses(view)}>
          { filteredArticles.map((article, idx) => (
            <li key={idx} className="bg-bg-darker px-4 py-6 rounded">
              <Link to={article.slug}>
                <h4 className="font-bold text-white">
                  {article.meta.title}
                </h4>
              </Link>
              <small className="font-light text-light-gray">
                {
                  article.meta.edited
                    ? formatTheDate(article.meta.edited)
                    : formatTheDate(article.meta.created)
                }
              </small>
              <p className="text-light-gray mt-1 mb-4 text-sm">{article.meta.description}</p>
              <Link to={article.slug} className="underline text-light-gray">
                Read article
              </Link>
          </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
};
