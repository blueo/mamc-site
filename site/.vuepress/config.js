const config = require("../config.json");
const matter = require("gray-matter");
const glob = require("glob");
const files = glob.sync("./.forestry/front_matter/templates/*.yml");
const path = require("path");
const keyBy = require("lodash/keyBy");
const templates = files.map((file) => {
  const fileName = path.basename(file, ".yml");
  const config = matter.read(file);
  return {
    fileName,
    ...config,
  };
});
const contentTemplates = keyBy(templates, "fileName");

module.exports = {
  title: config.title,
  description: config.description,
  base: "/",
  themeConfig: {
    logo: config.logo,
    footer: config.footer,
    nav: config.navigation,
    contentTemplates,
  },
  head: [
    ["link", { rel: "icon", href: config.favicon }],
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    [
      "link",
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#da532c" }],
    ["meta", { name: "theme-color", content: "#ffffff" }],
  ],
  markdown: {
    anchor: {
      permalink: false,
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  plugins: [
    // @todo re-activate this and have small script for menu toggle
    // [
    //   "vuepress-plugin-dehydrate",
    //   {
    //     // disable SSR
    //     noSSR: "404.html",
    //     // remove scripts
    //     noScript: [
    //       // support glob patterns
    //       "**/*.html",
    //       "!404.html",
    //     ],
    //   },
    // ],
  ],
};
