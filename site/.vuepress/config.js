const config = require("../config.json");
module.exports = {
  title: config.title,
  description: config.description,
  base: "/",
  themeConfig: {
    logo: config.logo,
    footer: config.footer,
    nav: config.navigation,
  },
  head: [
    ["link", { rel: "icon", href: config.favicon }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
  ],
  markdown: {
    anchor: {
      permalink: false,
    },
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
