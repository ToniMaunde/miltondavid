import { useMemo } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import  type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { getMDXComponent } from "mdx-bundler/client";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import type { CompleteArticle } from "~/util/articles.server";
import { getArticleContent } from "~/util/articles.server";
import { formatTheDate } from "~/util";
import styles from "~/styles/codehighlight.css";

export function links () {
  return [{ rel: "stylesheet", href: styles }]
};

type LoaderData = {
  article: CompleteArticle | null;
};

// TODO: Check the docs for remix 1.7.1
export const meta: MetaFunction = ({ data }) => {
  const { article } = data as LoaderData;
  const title = article ? article.preview.meta.title : "Article Not Found";
  const description = article ? article.preview.meta.description : "The article you're looking for does not exist";
  return {
    title: `${title} | Milton David`,
    description: `${description}`,
    "twitter:card": "summary",
    "twitter:site": "@tonimaunde",
    "twitter:creator": "@tonimaunde",
    "twitter:title": `${title}`,
    "twitter:description": `${description}`,
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  // unlikely to occur
  if (!params.slug) {
    throw new Error('There is no article with this slug');
  }
  const slug = params.slug;
  const result = await getArticleContent(slug);
  if (result.success) {
    return {
      article: result.article
    }
  };
  return {
    article: null
  };
};

export default function BlogArticle() {
  const { article } = useLoaderData<LoaderData>();
  console.log(article, "here")

  const Article = useMemo(() =>  {
    return article ? getMDXComponent(article?.code as string) : () => <p>Something</p>
  }, [article])
  const articleDate = formatTheDate(article?.preview.meta.created);

  return (
    <>
      <Navbar />
      <div className="px-4">
        { article
            ? <>
                <Link
                  to="/blog"
                  className="bg-white font-semibold rounded block mt-3 w-fit px-5 py-3 border border-white hover:border hover:border-primary hover:bg-gray hover:text-primary"
                >
                  Back
                </Link>
                <header>
                  <h1 className="mt-8 text-white font-bold text-xl">
                    {article.preview.meta.title}
                  </h1>
                  <p className="mb-4 text-xs text-light-gray">
                    <time
                      dateTime={article.preview.meta.created}
                    >
                      {articleDate}
                      </time>
                  </p>
                </header>
                <main className="min-w-full pb-10 prose prose-h1:text-white prose-h1:text-xl prose-p:text-light-gray prose-blockquote:py-1 prose-blockquote:bg-bg-darker prose-blockquote:border-l-primary prose-h3:text-white prose-h3:text-lg prose-pre:p-0 prose-strong:text-white prose-unordered-list prose-ul:text-light-gray">
                  <Article />
                </main>
              </>
            :
              <>
                <Link
                  to="/blog"
                  className="bg-white font-semibold rounded block my-3 w-fit px-5 py-3 border border-white hover:border hover:border-primary hover:bg-gray hover:text-primary"
                >
                  Go Back
                </Link>
                <main className="text-light-gray mb-4">
                  WIP - will add more sauce to this page
                  The article you're looking for doesn't exist or was deleted.
                </main>
              </>
        }
      </div>
      <Footer />
    </>
  )
}