import { useMemo } from "react";
import { useLoaderData } from "@remix-run/react";
import  type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { getMDXComponent } from "mdx-bundler/client";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import type { CompleteArticle } from "~/util/articles.server";
import { getArticleContent } from "~/util/articles.server";

type LoaderData = {
  isEmpty: boolean;
  content: CompleteArticle | null;
};

// Check the docs for remix 1.7.1
export const meta: MetaFunction = ({ data }) => {
  const metaData = data as LoaderData;
  const title = metaData.content?.preview.meta.title;
  const description = metaData.content?.preview.meta.description; 
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
  if (!params.slug) {
    throw new Error('There is no article with this slug');
  }
  
  const slug = params.slug;
  const result = await getArticleContent(slug);

  if (typeof result === "boolean") {
    return {
      isEmpty: true,
      content: null
    };
  }

  return {
    isEmpty: false,
    content: result
  };
};

export default function BlogArticle() {
  const { isEmpty, content } = useLoaderData<LoaderData>();
  const codeAsString = content?.code as string;
  
  const Article = useMemo(() => getMDXComponent(codeAsString), [codeAsString]);

  return (
    <>
      <Navbar />
      { isEmpty
          ? <main className="text-light-gray">There is no article with this slug</main>
          : <main className="px-4 py-10 prose prose-h1:text-white prose-h1:text-xl prose-p:text-light-gray">
              <Article />
            </main>
      }
      <Footer />
    </>
  )
}