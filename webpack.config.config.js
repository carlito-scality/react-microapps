/* eslint-env node */
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const URLImportPlugin = require("webpack-external-import/webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = {
  entry: {
    shell: path.resolve(__dirname, "./src/config.js")
  },
  output: {
    filename: "js/[name].[hash].js",
    path: path.resolve(__dirname, "build"),
    chunkFilename: "js/[name].[chunkhash].js",
    publicPath: "http://localhost:8233/"
  },
  mode: "production",
  module: {
    rules: [
      { parser: { System: false } },
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader"
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, "node_modules"), /\.krem.css$/],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              localIdentName: "[path][name]__[local]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [require("autoprefixer")];
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "node_modules")],
        exclude: [/\.krem.css$/],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        use: {
          loader: "url-loader"
        }
      }
    ]
  },
  resolve: {
    modules: [__dirname, "node_modules"]
  },
  plugins: [
    new WriteFilePlugin(),
    new URLImportPlugin({
      manifestName: "shell",
      fileName: "importManifest.js",
      basePath: "",
      publicPath: "//localhost:8233/",
      transformExtensions: /^(gz|map)$/i,
      writeToFileEmit: false,
      seed: null,
      filter: null,
      debug: true,
      map: null,
      generate: null
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true
    })
  ],
  devtool: "inline-source-map",
  node: {
    fs: "empty"
  },
  optimization: {
    runtimeChunk: {
      name: "webpackRuntime"
    }
  }
};
