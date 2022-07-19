import { Configuration as WebpackConfiguration, DefinePlugin } from "webpack"
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"
import HtmlWebpackPlugin from "html-webpack-plugin"
import dotenvlib from "dotenv"
const dotenv = dotenvlib.config({
  path: "./conf/.env",
})
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
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
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    port: 3002,
    open: true,
    hot: true,
  },
}

export default config
