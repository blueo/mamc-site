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
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap"}],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"}],
    ["script", {src:"https://kit.fontawesome.com/0bdbd80af7.js", crossorigin: "anonymous", async: true}]
  ],
  markdown: {
    anchor: {
      permalink: false,
    },
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
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
