module.exports = {
  chainWebpack(config) {
    config.resolve.alias.delete('@');
    config.resolve.plugin(`tsconfig-paths`)
      .use(require("tsconfig-paths-webpack-plugin"));
  },
  publicPath: process.env.NODE_ENV === `production` ? process.env.APP_PATH || `/bepro-docs/` : `/`,
  productionSourceMap: process.env.NODE_ENV !== 'production',
}
