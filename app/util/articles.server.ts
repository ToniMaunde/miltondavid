import path from "path";
import fs from "fs";
import graymatter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

type ArticleMeta = {
  title: string;
  description: string;
  created: string;
  edited: string | undefined;
  tags: string[];
}

type ArticlePreview = {
  slug: string;
  meta: ArticleMeta
}

export type CompleteArticle = {
  preview: ArticlePreview,
  code: string;
}

const ARTICLES_PATH = path.normalize(`${__dirname}/../app/articles`);

function getArticleSlugs(): string[] {
  const files = fs.readdirSync(ARTICLES_PATH);
  return files.map(file => {
    return file.replace(".mdx", "");
  });
};

export function getArticlesMeta(): ArticlePreview[] {
  const slugs = getArticleSlugs();
  const articlesWithMeta = slugs.map(slug => {
    const filePath = path.join(ARTICLES_PATH, `${slug}.mdx`);
    
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = graymatter(fileContents);
    const articleMeta: ArticleMeta = data.meta;

    return {
      slug,
      meta: articleMeta
    }
  });

  return articlesWithMeta;
};

export async function getArticleContent(slug: string): Promise<boolean | CompleteArticle> {
  const filePath = path.join(ARTICLES_PATH, `${slug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const rehypeHighlight = await import("rehype-highlight");
    
    const bundle = await bundleMDX({
      source: fileContents,
      mdxOptions(options, frontmatter) {
        options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeHighlight.default]
    
        return options
      },
    });
    const { code, frontmatter } = bundle;
    
    return {
      preview: {
        slug,
        meta: frontmatter.meta
      },
      code,
    }
  } catch (error) {
    return true;
  }
};