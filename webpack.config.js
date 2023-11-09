const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const { mode } = env;
  return {
    mode: "development",
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devtool: "inline-source-map",
    plugins: [
      new HtmlWebpackPlugin({ template: "public/index.html" }),
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [{ from: "public/icons", to: "icons" }],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            mode === "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, "public/img"), "node_modules"],
    },
  };
};
