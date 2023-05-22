import { useMemo, useContext, useEffect } from "react";
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
import { Icon } from "~/components/Icon";
import chevronRightIcon from "~/assets/icons/chevronRight";
import { Menu, MenuStateContext } from "~/providers/menuStateProvider";

export function links() {
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

  const { setMenuState } = useContext(MenuStateContext);

  useEffect(() => {
    setMenuState(Menu.CLOSED);
  }, []);

  const { article } = useLoaderData<LoaderData>();
  const params = useParams();

  const Article = useMemo(() => {
    return article ? getMDXComponent(article?.code as string) : () => <p>This should not occur.</p>
  }, [article])
  const articleDate = formatTheDate(article?.preview.meta.created);

  return (
    <>
      <Navbar />
      <div className="responsive-block-padding responsive-inline-padding">
        {article
          ?
          <>
            <Link
              to="/blog"
              className="flex items-center gap-2 text-baby-powder md:hidden"
            >
              <Icon
                {...chevronRightIcon}
                className="w-4 h-4 fill-baby-powder"
              />
              See articles
            </Link>
            <nav
              className="hidden items-center gap-2 fill-baby-powder md:flex"
            >
              <Link
                to="/"
                className="w-fit text-light-gray fill-light-gray hover:text-naples-yellow hover:fill-naples-yellow"
              >
                Home
              </Link>
              <Icon
                {...chevronRightIcon}
                className="w-4 h-4 rotate-180"
              />
              <Link
                to="/blog"
                className="w-fit py-2 text-light-gray fill-light-gray hover:text-naples-yellow hover:fill-naples-yellow"
              >
                Blog
              </Link>
              <Icon
                {...chevronRightIcon}
                className="w-4 h-4 rotate-180"
              />
              <Link
                to={`/blog/${article.preview.slug}`}
                className="w-fit py-2 text-naples-yellow fill-light-gray hover:text-naples-yellow hover:fill-naples-yellow"
              >
                {article.preview.meta.title}
              </Link>

            </nav>
            <header>
              <h1 className="text-baby-powder font-bold responsive-article-title responsive-block-padding padding-block-end-0">
                {article.preview.meta.title}
              </h1>
              <p className="mb-4 text-xs text-phillipine-silver">
                <time
                  dateTime={article.preview.meta.created}
                >
                  {articleDate}
                </time>
              </p>
            </header>
            <main className="min-w-full prose prose-p:max-w-[80ch] prose-p:text-phillipine-silver prose-blockquote:py-1 prose-blockquote:pr-2 prose-blockquote:bg-charleston-green prose-blockquote:border-l-naples-yellow prose-blockquote:not-italic prose-blockquote:rounded prose-h3:text-baby-powder prose-h3:text-xl prose-pre:p-0 prose-strong:text-baby-powder prose-unordered-list prose-ul:text-light-gray">
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
