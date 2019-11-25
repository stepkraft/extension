const paths = require('react-scripts/config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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

        config.plugins = config.plugins
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

        config.plugins = config.plugins
            .filter(pl => !(pl instanceof MiniCssExtractPlugin))
            .concat([new MiniCssExtractPlugin({
              // Options similar to the same options in webpackOptions.output
              // both options are optional
              filename: 'static/css/[name].css',
              chunkFilename: 'static/css/[name].chunk.css',
            })]
        );

        config.plugins.push(new CopyPlugin([
          {
            from: 'assets/*',
            context: 'src/'
          }
        ]));

        return config;
      },
  }