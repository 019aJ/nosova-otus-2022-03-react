import { Configuration, DefinePlugin } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
/* eslint @typescript-eslint/no-var-requires: "off" */
import dotenvlib from "dotenv"
const dotenv = dotenvlib.config({
  path: "./conf/.env",
})
const config: Configuration = {
  mode: "production",
  output: {
    publicPath: "/nosova-otus-2022-03-react",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
  ],
}

export default config
