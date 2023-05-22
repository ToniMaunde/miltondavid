import path from "path";
import fs from "fs";
import graymatter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

type ArticleMeta = {
  title: string;
  description: string;
  created: string;
  edited: string | undefined;
  tags: string[];
}

type ArticlePreview = {
  isDirectory: boolean;
  slug: string;
  meta: ArticleMeta
}

type DirectoryReading = {
  name: string;
  isDirectory: boolean;
};

export type CompleteArticle = {
  preview: ArticlePreview;
  code: string;
}

const ARTICLES_PATH = path.normalize(`${__dirname}/../app/articles`);
const globalComponentsPath = path.normalize(path.join(ARTICLES_PATH, "components"));

function getDirectoryReadings(): DirectoryReading[] {

  function setDirectoryFlag(readings: string[]) {
    return readings.map(reading => {
      if (reading.includes(".")) return {
        name: reading,
        isDirectory: false
      };
      return {
        name: reading,
        isDirectory: true
      };
    });
  };

  function filterOutComponents(readingsWithFlags: DirectoryReading[]) {
    return readingsWithFlags.filter(reading => !reading.name.includes(".tsx"));
  };
  
  function removeComponentsDirectory(readings: string[]) {
    return readings.filter(reading => reading !== "components");
  };

  const readings = fs.readdirSync(ARTICLES_PATH);
  const readingsExcludingGlobalComponentsFolder = removeComponentsDirectory(readings);
  const readingsWithFlags = setDirectoryFlag(readingsExcludingGlobalComponentsFolder);
  const readingsExcludingComponents = filterOutComponents(readingsWithFlags);

  return readingsExcludingComponents.map(reading => {
    if (reading.isDirectory) return reading;
    return {
      name: reading.name.replace(".mdx", ""),
      isDirectory: reading.isDirectory
    }
  });
};

function getGlobalComponents(): string[] {
  const globalComponents = fs.readdirSync(globalComponentsPath);
  return globalComponents;
};

export function getArticlesMeta(): ArticlePreview[] {

  function getDirectoryReadingMDXFilePath(directoryReading: DirectoryReading) {
    const { name, isDirectory } = directoryReading;
    if (isDirectory) {
      return {
        path: path.join(ARTICLES_PATH, name, "index.mdx"),
        isDirectory: true
      };
    };
    return {
      path: path.join(ARTICLES_PATH, `${name}.mdx`),
      isDirectory: false
    };
  };

  function composeArticleMeta(reading: DirectoryReading) {
    const filePath = getDirectoryReadingMDXFilePath(reading);
    const fileContents = fs.readFileSync(filePath.path, "utf8");
    const { data } = graymatter(fileContents);
    const articleMeta: ArticleMeta = data.meta;

    return {
      isDirectory: filePath.isDirectory,
      slug: reading.name,
      meta: articleMeta
    }
  };

  const directoryReadings = getDirectoryReadings();
  const articlesWithMeta = directoryReadings.map(composeArticleMeta);
  return articlesWithMeta;
};

export async function getArticleContent(queriedSlug: string): Promise<{success: boolean, article?: CompleteArticle}> {

  async function getMDXBundle(pathWithExtension: string, files: Record<string, string>) {
    const fileContents = fs.readFileSync(pathWithExtension, "utf-8");
    const bundle = await bundleMDX({
      source: fileContents,
      files,
      mdxOptions(options, frontmatter) {
        options.rehypePlugins = [...(options.rehypePlugins ?? []), 
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behaviour: "wrap", properties: { className: "heading-link"}}]
        ];
    
        return options
      },
    });
    
    return bundle;
  };

  function getSourceCodeFromGlobalComponents(globalComponentsArray: string[], globalComponentsPath: string): Record<string, string> {
    const result = Object.create(null);
    for (const globalComponent of globalComponentsArray) {
      const sourceCode = fs.readFileSync(`${globalComponentsPath}/${globalComponent}`);
      const relativePath = `./${globalComponent}`;
      result[relativePath] = sourceCode;
    };

    return result;
  };

  function getSourceCodeFromComponents(componentsArray: string[], componentsPath: string, globalComponents: Record<string, string>): Record<string, string> {
    const result = globalComponents;
    for (const component of componentsArray) {
      const sourceCode = fs.readFileSync(`${componentsPath}/${component}`).toString();
      const relativePath = `./${component}`;
      globalComponents[relativePath] = sourceCode;
    };
    
    return result;
  };

  async function getArticleBundledWithComponents(articleSlug: string, filePath: string, isDirectory: boolean) {
    const globalComponentsArrays = getGlobalComponents();
    const globalComponentsAndTheirSourceCode = getSourceCodeFromGlobalComponents(globalComponentsArrays, globalComponentsPath);

    if (isDirectory) {
      const articleComponentsDirectory = path.join(ARTICLES_PATH, articleSlug);
      const componentsInDirectory = fs.readdirSync(`${ARTICLES_PATH}/${articleSlug}`);
      const componentsInTheDirectory = componentsInDirectory.filter(file => file.endsWith(".tsx"));
      const componentsAndTheirSourceCode = getSourceCodeFromComponents(componentsInTheDirectory, articleComponentsDirectory, globalComponentsAndTheirSourceCode);
      const fileBundle = await getMDXBundle(filePath, componentsAndTheirSourceCode);
      return fileBundle;
    };
    const fileBundle = await getMDXBundle(filePath, globalComponentsAndTheirSourceCode);
    return fileBundle;
  };
  
  const existingArticles = getArticlesMeta();
  const queriedArticle = existingArticles.find(article => article.slug === queriedSlug);
  if(queriedArticle) {
    const { slug, isDirectory } = queriedArticle;
    if (isDirectory) {
      const filePath = path.join(ARTICLES_PATH, slug, "index.mdx");
      const fileBundle = await getArticleBundledWithComponents(slug, filePath, true);
      
      return {
        success: true,
        article: {
          code: fileBundle.code,
          preview: {
            isDirectory: true,
            meta: fileBundle.frontmatter.meta,
            slug: slug
          }
        }
      };
    } else {
        const filePath = path.join(ARTICLES_PATH, `${slug}.mdx`);
        const fileBundle = await getArticleBundledWithComponents(slug, filePath, false);
        
        return {
          success: true,
          article: {
            code: fileBundle.code,
            preview: {
              isDirectory: true,
              meta: fileBundle.frontmatter.meta,
              slug: slug
            }
          }
        };
    }
  };
  return {
    success: false
  };
};
