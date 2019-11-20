const paths = require('react-scripts/config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    webpack: function(config, env) {
        config.entry = {
            main: paths.appIndexJs,
            contentScript: `${paths.appSrc}/contentScript.js`,
        };

        config.output.filename = (chunkData) => {
            return chunkData.chunk.name === 'contentScript' ? 'static/js/[name].js' : 'static/js/[name].[hash:8].js';
        };

        config.optimization.runtimeChunk = false;
        config.optimization.splitChunks = {
          cacheGroups: {
            default: false,
          },
        };

        const originalPlugins = [...config.plugins];
        config.plugins = originalPlugins
            .filter(pl => !(pl instanceof HtmlWebpackPlugin))
            .concat([new HtmlWebpackPlugin({
              inject: true,
              template: paths.appHtml,
              excludeChunks: ['contentScript'],
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            })]
        );

        return config;
      },
  }