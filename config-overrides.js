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
                const [firstLoader, ...otherLoaders] = r.use;
                r.use = [
                  firstLoader,
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
                      }]
                    })
                  },
                  ...otherLoaders
                ];
              }
              return r;
            });
            // rule.oneOf.push({
            //   test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
            //   loader: 'file-loader',
            //   options: {
            //     name: 'static/media/[name].[hash:8].[ext]',
            //   }
            // });
          }
          return rule;
        });

      //   config.module.rules = config.module.rules.map(rule => {
      //     if (rule.oneOf instanceof Array) {
      //         return {
      //             ...rule,
      //             oneOf: [
      //               {
      //                 test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
      //                 loader: 'file-loader',
      //                 options: {
      //                   name: 'static/media/[name].[hash:8].[ext]',
      //                   // name: '[name].[hash:8].[ext]',
      //                   // publicPath: 'static/media/',
      //                   // postTransformPublicPath: (p) => {
      //                   //   // console.log('postTransformPublicPath', p);
      //                   //   if ('production' === env) {
      //                   //     // __webpack_public_path__ = window.chrome.extension.getURL('')
      //                   //     // return `__webpack_public_path__ + ${p}`;
      //                   //     return `chrome-extension://__MSG_@@extension_id__/${p}`;
      //                   //   }
      //                   //   return p;
      //                   // },
      //                   // outputPath: (url) => {
      //                   //   // console.log('outputPath', url);
      //                   //   // console.log('env', env);
      //                   //   // console.log('__webpack_public_path__', __webpack_public_path__)
      //                   //   return `static/media/${url}`;
      //                   // }
      //                 }
      //               },
      //               // {
      //               //   test: /static\/css\/contentScript\.css$/,
      //               //   loader: 'string-replace-loader',
      //               //   options: {
      //               //     pattern: /\@font-face\{(.*?)\}/ig,
      //               //     replacement: (match, p1, offset, string) => {
      //               //       console.log('match p1', p1);
      //               //       const font_updated = p1.replace(/url\((.*?)\)/gi, `url(chrome-extension://__MSG_@@extension_id__$1)`);
      //               //       console.log('font_updated', font_updated);
      //               //       return 'HUI';
      //               //       // return `@font-face{${font_updated}}`;
      //               //     },
      //               //     flags: 'g'
      //               //   }
      //               // },
      //                 ...rule.oneOf
      //             ]
      //         };
      //     }
  
      //     return rule;
      // });

      // config.module.rules.forEach(r => {
      //   // console.log('rule', r);
      //   if (r.oneOf instanceof Array) {
      //     r.oneOf.forEach(rule => {
      //       // if (!!rule.test) {
      //         console.log('rule', rule);
      //       // }
      //     });
      //   }
      // });

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