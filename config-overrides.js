const paths = require('react-scripts/config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

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

        module.rules = config.module.rules.map(rule => {
          if (rule.oneOf instanceof Array) {
            rule.oneOf.map(r => {
              if (String(r.test) === String(/\.css$/)) {
                const [miniCssExtract, cssLoader, ...otherLoaders] = r.use;
                r.use = [
                  miniCssExtract,
                  {
                    loader: StringReplacePlugin.replace({
                      replacements: [{
                        pattern: /\@font-face\{(.*?)\}/ig,
                        replacement: function (match, p1, offset, string) {
                          if (env !== 'production') {
                            return `@font-face{${p1}}`
                          }
                          const font_updated = p1.replace(/url(?!\(data)\((.*?)\)/gi, `url(chrome-extension://__MSG_@@extension_id__$1)`);
                          return `@font-face{${font_updated}}`;
                        }
                      }, {
                        pattern: /background\s*:\s*url\((.*?)\)/ig,
                        replacement: function(match, p1, offset, string) {
                          if (env !== 'production' || p1.includes('chrome-extension://')) {
                            return `background: url(${p1})`
                          }
                          const url_updated = `chrome-extension://__MSG_@@extension_id__${p1}`;
                          return `background: url(${url_updated})`;
                        }
                      }]
                    })
                  },
                  cssLoader,
                  ...otherLoaders
                ];
              }
              return r;
            });
          }

          return rule;
        });

        config.plugins = config.plugins
            .filter(pl => !(pl instanceof MiniCssExtractPlugin))
            .concat([new MiniCssExtractPlugin({
              // Options similar to the same options in webpackOptions.output
              // both options are optional
              filename: 'static/css/[name].css',
              chunkFilename: 'static/css/[name].chunk.css',
            }),
            new StringReplacePlugin()]
        );

        return config;
      },
  }