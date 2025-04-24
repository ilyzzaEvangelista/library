const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/projects" : "/",
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },
  chainWebpack: (config) => {
    // Disable Babel optimization for large Vuetify file
    config.module
      .rule('js')
      .test(/node_modules[\\\/]vuetify[\\\/]dist[\\\/]vuetify.js/)
      .use('babel-loader')
      .loader('babel-loader')
      .tap(options => ({
        ...options,
        compact: false,
      }));
  },
});
