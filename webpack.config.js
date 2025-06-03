import { resolve } from 'path';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config = {
  mode: 'production',
  entry: './src/index.ts',
  plugins: [new MiniCssExtractPlugin({ filename: 'bundle.css' })],
  module: {
    rules: [
      {
        test: /src.*\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /src.*\.html$/i,
        use: "html-loader",
        exclude: /node_modules/,
      },
      {
        test: /src.*\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: resolve('dist'),
  },
};

export default config;
