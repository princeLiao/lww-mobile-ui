const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';
    const externals = [
        {
            "module": "react",
            "entry": devMode ? "//unpkg.com/react@16/umd/react.development.js" : "//unpkg.com/react@16/umd/react.production.min.js",
            "global": "React"
        },
        {
            "module": "react-dom",
            "entry": devMode ? "//unpkg.com/react-dom@16/umd/react-dom.development.js" : "//unpkg.com/react-dom@16/umd/react-dom.production.min.js",
            "global": "ReactDOM"
        },
        {
            "module": "react-router-dom",
            "entry": devMode ? "//cdnjs.cloudflare.com/ajax/libs/react-router-dom/4.2.2/react-router-dom.js" : "//cdnjs.cloudflare.com/ajax/libs/react-router-dom/4.2.2/react-router-dom.min.js",
            "global": "ReactRouterDOM"
        }
    ];
    const baseConfig = {
        devtool:devMode?'eval-source-map':false,
        entry: {
            app: path.join(__dirname, './src/entry/index.jsx')
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "js/[name].[hash:8].js"
        },
        resolve: {
            extensions: ['.web.js','.ts','.tsx','.jsx', '.js', '.json'], //antd中 .web.js 放在 .js 之前，这样就会优先找.web.js后缀的js：
            alias: {
                //别名配置
                component: path.join(__dirname, './src/component'),
                entry: path.join(__dirname, './src/entry'),
                common: path.join(__dirname, './src/js/common'),
                action: path.join(__dirname, './src/action'),
                utils: path.join(__dirname, './src/utils')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    exclude: /node_modules/,
                    use:  {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ["transform-runtime", {
                                    polyfill: false
                                }],
                                [
                                    "react-css-modules",
                                    {
                                        "filetypes": {
                                            ".scss": {
                                                "syntax": "postcss-scss"
                                            }
                                        },
                                        "generateScopedName": "[name]_[local]_[hash:base64:5]",
                                    }
                                ],
                                "lodash"
                            ],
                            presets: ['es2015', 'stage-1', 'react']
                        }
                    }
                },
                {
                    test: /\.json$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "json-loader"
                    }
                },
                {
                    test: /\.jsx|js$/,
                    include: path.resolve(__dirname, 'src/entry'),
                    enforce: 'pre',
                    use: {
                        loader: "eslint-loader",
                        options: {
                            configFile: __dirname + '/.eslintrc'
                        }
                    },
                },
                /**
                 * 全局的样式 不受css modules影响
                */
                {
                    test: /\.scss$/,
                    exclude: [/node_modules/],
                    use: [
                        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                        {
                            //全局sass文件
                            loader: 'sass-resources-loader',
                            options: {
                                resources: path.resolve(__dirname, 'src/css/base.scss')
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: 'postcss',
                                plugins: (loader) => [
                                    require('postcss-import')({ root: loader.resourcePath }),
                                    require('postcss-preset-env')({
                                        "stage": 3,
                                        "browsers": ["last 2 versions", "> 5%"],
                                        autoprefixer: {
                                            grid: true
                                        }
                                    }),
                                    // require('postcss-cssnext')(),已启用  postcss-preset-env取代其功能
                                    require('cssnano')(),
                                    require('postcss-pxtorem')({
                                        rootValue: 100,
                                        propWhiteList: []
                                    })
                                ]
                            }

                        }
                    ],
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                },
                {
                    test: /\.ejs$/,
                    use: [
                        {
                            loader: "ejs-loader",
                        }
                    ]
                },
                {
                    test: '/\.md$/',
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "markdown-loader",
                            options: {
                                pedantic: true,
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        query: {
                            limit: 8192,
                            name: 'images/[name][hash:8].[ext]'
                        }
                    }]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [{
                        loader: 'file-loader',
                    }]
                },
                {
                    test: /\.(svg)$/i,
                    include: [
                        require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
                    ],
                    use: [
                        {
                            loader: 'svg-sprite-loader'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                curEnv: devMode ? 'dev' : 'prod',
                title: "test",
                template: __dirname + "/src/index.ejs",
                minify: devMode ? false : {
                    "removeAttributeQuotes": true,
                    "removeComments": true,
                    "removeEmptyAttributes": true,
                },
                hash: true
            }),
            new HtmlWebpackExternalsPlugin({
                externals: externals,
              }),
            // new CopyWebpackPlugin([{
            //     from: __dirname + '/lib/',
            //     to: __dirname + '/dist/lib'
            // }]),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash:8].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash:8].css',
            })
            // new HotModuleReplacementPlugin()  webpack4 默认添加 不许配置
        ]
    };
    if (devMode) {
        return webpackMerge(baseConfig, {
            devServer: {
                contentBase: "./dist/", //本地服务器所加载的页面所在的目录
                historyApiFallback: true, //不跳转
                open: true,
                inline: true,//实时刷新
                host: 'localhost',
                port: 3030
            },
            plugins: [

            ]
        })
    } else {
        return webpackMerge(baseConfig, {
            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        cache: true,
                        parallel: true,
                        sourceMap: false // set to true if you want JS source maps
                    }),
                    new OptimizeCSSAssetsPlugin({})
                ]
            },
            plugins: [
                new CleanWebpackPlugin(
                    ['dist/*'], 　 //匹配删除的文件
                    {
                        root: path.resolve(__dirname),
                        //根目录
                        verbose: true,
                        //开启在控制台输出信息
                        dry: false
                    }
                ),
                new ImageminPlugin({
                    pngquant: {
                        quality: '95-100'
                    }
                }),
            ]

        })
    }

}


