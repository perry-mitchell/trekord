const path = require("path");
const { DefinePlugin } = require("webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const pkgInfo = require("./package.json");

const DIST = path.resolve(__dirname, "./dist");
const SOURCE = path.resolve(__dirname, "./source");

// const { } = process.env;

module.exports = [
    {
        devtool: "eval-cheap-source-map",

        entry: {
            client: path.join(SOURCE, "./client/index.tsx"),
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "./tsconfig.web.json")
                        }
                    }],
                    exclude: /node_modules/
                },
                {
                    test: /\.pug$/,
                    loader: "pug-loader"
                },
                {
                    test: /\.sass$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                              // Prefer `dart-sass`
                              implementation: require("sass"),
                            }
                        }
                    ]
                }
            ]
        },

        output: {
            filename: "[name].js",
            path: path.join(DIST, "client")
        },

        plugins: [
            new MiniCSSExtractPlugin({
                filename: "../styles/main.css"
            }),
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             from: path.resolve(__dirname, "./resources/public"),
            //             to: path.join(DIST, "public"),
            //         },
            //     ]
            // }),
            new HTMLWebpackPlugin({
                filename: "../page/main.html",
                inject: false,
                template: path.resolve(__dirname, "./resources/template.pug"),
                templateParameters: {
                    script: "/script/main.js",
                    styles: "/styles/main.css",
                    title: "Trekord"
                }
            }),
            // new HTMLWebpackPlugin({
            //     filename: "../page/private.html",
            //     inject: false,
            //     template: path.resolve(__dirname, "./resources/index.pug"),
            //     templateParameters: {
            //         script: "/script/private.js",
            //         styles: "/styles/private.css",
            //         title: "Trekord"
            //     }
            // }),
            new DefinePlugin({
                __VERSION__: JSON.stringify(pkgInfo.version)
            })
        ],

        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

        target: "web",

        watchOptions: {
            poll: 1000,
            ignored: /node_modules/
        }
    }
]
