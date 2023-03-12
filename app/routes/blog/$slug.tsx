import { useMemo } from "react";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
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
  article: CompleteArticle;
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
  // Does not even get triggered
  if (!params.slug) {
    throw new Response("Not found", {
      status: 404,
    });
  };

  const slug = params.slug;
  const result = await getArticleContent(slug);

  return json({
    article: result.article
  });
};

export default function BlogArticle() {
  const { article } = useLoaderData<LoaderData>();
  const params = useParams();

  const Article = useMemo(() =>  {
    return article ? getMDXComponent(article?.code as string) : () => <p>This should not occur.</p>
  }, [article])
  const articleDate = formatTheDate(article?.preview.meta.created);

  return (
    <>
      <Navbar />
      <div className="px-4 md:pt-8 md:px-24 lg:px-40 xl:px-60 2xl:px-80 3xl:px-96 4xl:px-104">
        { article
            ? <>
                <Link
                  to="/blog"
                  className="bg-white font-semibold rounded block mt-3 w-fit px-5 py-2 border border-white hover:border hover:border-primary hover:bg-gray hover:text-primary"
                >
                  Back
                </Link>
                <header>
                  <h1 className="mt-8 text-white font-bold text-2xl">
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
                <main className="min-w-full pb-10 prose prose-p:text-light-gray prose-blockquote:py-1 prose-blockquote:pr-2 prose-blockquote:bg-bg-darker prose-blockquote:border-l-primary prose-h3:text-white prose-h3:text-xl prose-pre:p-0 prose-strong:text-white prose-unordered-list prose-ul:text-light-gray">
                  <Article />
                </main>
              </>
            :
              <div className="py-10">
                <h2 className="text-white font-semibold text-xl text-center mb-2">
                  Oh no, article not found.
                </h2>
                <p className="text-center text-light-gray mb-10">
                  The &nbsp;
                    <span className="bg-primary p-1 rounded-sm text-bg">
                      /{params.slug}
                    </span>
                    &nbsp; article does not exist or it was deleted.
                </p>
                <p className="text-center text-light-gray mb-1">
                  Read the existing articles at
                </p>
                <Link
                  to="/blog"
                  className="font-semibold text-center block text-white"
                >
                  my blog
                </Link>
              </div>
        }
      </div>
      <Footer />
    </>
  )
};
