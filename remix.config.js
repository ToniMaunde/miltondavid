/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "vercel",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    "bail",
    "fault",
    "hast-util-is-element",
    "hast-util-to-text",
    "lowlight",
    "rehype-highlight",
    "trough",
    "unified",
    "unist-util-find-after",
    "unist-util-is",
    "unist-util-stringify-position",
    "unist-util-visit",
    "unist-util-visit-parents",
    "vfile",
    "vfile-message",
    "hast-util-has-property",
    "hast-util-heading-rank",
    "rehype-autolink-headings",
    "hast-util-to-string",
    "rehype-slug",
    "vfile-message"
  ]
};
