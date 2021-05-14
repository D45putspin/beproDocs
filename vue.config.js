module.exports = {
  chainWebpack(config) {
    config.resolve.alias.delete('@');
    config.resolve.plugin(`tsconfig-paths`)
      .use(require("tsconfig-paths-webpack-plugin"));
  },
  assetsDir: `static`,
  publicPath: process.env.NODE_ENV === `production` ? process.env.APP_PATH || `/dist/` : `/`,
  productionSourceMap: process.env.NODE_ENV !== 'production',
}
